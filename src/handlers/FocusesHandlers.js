import { Alert } from 'react-native';
import { db, auth } from "../config/firebaseConfig";
import { displayTime, getElapsed } from "../utils";
import { 
  EXP_PER_SECOND,
  UPDATE_FOCUSES,
  ADD_FOCUS, UPDATE_FOCUS, DELETE_FOCUS, 
} from "../constants/Focuses";
import { UPDATE_STATUS } from "../constants/Status";
import { updateStats } from './StatsHandlers';

export async function updateFocuses(dispatch, update) {
  const batch = db.batch();

  for (const id in update) {
    const doc = await db.collection('focuses').doc(id);
    batch.update(doc, update[id]);
  }

  await batch.commit();
  
  dispatch({ type: UPDATE_FOCUSES, update });
};

export async function addFocus(dispatch, focus) {
  const doc = await db.collection('focuses').add(focus);

  dispatch({ type: ADD_FOCUS, id: doc.id, focus });
};

export async function deleteFocus(dispatch, id) {
  await db.collection('focuses').doc(id).delete();

  dispatch({ type: DELETE_FOCUS, id });
};

export async function updateFocus(dispatch, id, update) {
  await db.collection('focuses').doc(id).update(update);

  dispatch({ type: UPDATE_FOCUS, id, update }); 
};

export async function updateFocusCategories(dispatch, name, newName) {
  let query = db.collection('focuses');
  query = query.where('userId', '==', auth.currentUser.uid);
  query = query.where('category', '==', name);

  const update = {};
  const batch = db.batch();

  const querySnapshot = await query.get();

  querySnapshot.forEach(doc => {
    update[doc.id] = { category: newName }; 
    batch.update(doc.ref, update[doc.id]);
  });

  await batch.commit();

  dispatch({ type: UPDATE_FOCUSES, update });
};

export async function updateActiveFocuses(dispatch, activeStart) {
  const querySnapshot = await searchForWorkingFocuses();

  if (!querySnapshot.empty) {
    const elapsed = getElapsed(activeStart);

    requestFocusUpdate(dispatch, querySnapshot, elapsed);

    await deactivateFocuses(dispatch, querySnapshot);
  }
};

async function searchForWorkingFocuses() {
  let query = db.collection('focuses');
  query = query.where('userId', '==', auth.currentUser.uid);
  query = query.where('active', '==', true);
  query = query.where('working', '==', true);

  return await query.get();
};

async function deactivateFocuses(dispatch, querySnapshot) { 
  dispatch({ type: UPDATE_STATUS, update: { tracked: 0 } });

  const batch = db.batch();

  querySnapshot.forEach(doc => batch.update(doc.ref, { active: false }));

  await batch.commit();

  querySnapshot.forEach(doc => {
    clearInterval(doc.data().timer);
    dispatch({
      type: UPDATE_FOCUS, id: doc.id, update: { active: false }
    });
  });
};

function requestFocusUpdate(dispatch, querySnapshot, elapsed) {
  const title = 'Update Experience?';

  let message = '';
  message += 'These focuses have been active \n';
  message += `for ${displayTime(elapsed)} in the background.\n`; 
  message += '\n';

  querySnapshot.forEach(doc => message += doc.data().name + '\n');

  message += '\n';
  message += 'Is this correct?';

  Alert.alert(
    title, message,
    [
      { 
        text: 'Cancel', 
        onPress: () => {
          updateStats(dispatch, { inactiveStart: Date.now() - 1000 * elapsed });
        },
      },
      { 
        text: 'Confirm', 
        onPress: () => updateExperience(dispatch, querySnapshot, elapsed),
      },
    ],
  );
};

async function updateExperience(dispatch, querySnapshot, elapsed) {
  const update = {};
  const promises = [];
  
  querySnapshot.forEach(doc => {
    const transactionUpdateFunc = async transaction => {
      const docSnapshot = await transaction.get(doc.ref);

      update[docSnapshot.id] = {
        level: docSnapshot.data().level,
        experience: docSnapshot.data().experience + EXP_PER_SECOND * elapsed,
      };

      while (update[docSnapshot.id].experience >= 100) {
        update[docSnapshot.id].level++;
        update[docSnapshot.id].experience -= 100;
      }

      transaction.update(doc.ref, update[docSnapshot.id]);
    };

    promises.push(db.runTransaction(transactionUpdateFunc));
  });

  await Promise.all(promises);
  await updateStats(dispatch, { inactiveStart: Date.now() });

  dispatch({ type: UPDATE_FOCUSES, update });
};
