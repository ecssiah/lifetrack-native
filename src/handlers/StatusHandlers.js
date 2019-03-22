import { db, auth } from "../config/firebaseConfig";
import { Alert } from 'react-native';
import { displayTime, err, getElapsed } from "../utils";
import { UPDATE_FOCUS } from "../constants/Focuses";
import { UPDATE_STATUS } from "../constants/Status";
import { updateStats } from "./StatsHandlers";
import { updateExperience } from "./FocusesHandlers";

export async function onAppBackground(dispatch) {
  await updateStats(dispatch, { inactiveStart: Date.now() }).catch(err);
};

export async function onAppForeground(dispatch) {
  const querySnapshot = await searchForActiveFocuses().catch(err);

  if (!querySnapshot.empty) {
    const elapsed = await calculateElapsed().catch(err);

    requestFocusUpdate(dispatch, querySnapshot, elapsed);

    await deactivateFocuses(dispatch, querySnapshot).catch(err);
    await updateStats(dispatch, { inactiveStart: Date.now() }).catch(err);
  }
};

async function calculateElapsed() {
  const docRef = db.collection('stats').doc(auth.currentUser.uid);
  const doc = await docRef.get().catch(err);

  return getElapsed(doc.data().inactiveStart);
};

async function searchForActiveFocuses() {
  let query = db.collection('focuses');
  query = query.where('userId', '==', auth.currentUser.uid);
  query = query.where('active', '==', true);
  query = query.where('working', '==', true);

  return await query.get().catch(err);
};

async function deactivateFocuses(dispatch, querySnapshot) { 
  dispatch({ type: UPDATE_STATUS, update: { tracked: 0 } });

  const batch = db.batch();

  querySnapshot.forEach(doc => batch.update(doc.ref, { active: false }));

  await batch.commit().catch(err);

  querySnapshot.forEach(doc => {
    clearInterval(doc.data().timer);
    dispatch({
      type: UPDATE_FOCUS, id: doc.id, update: { active: false }
    });
  });
};

function requestFocusUpdate(dispatch, querySnapshot, elapsed) {
  const title = 'Update Focuses?';

  let message = '';
  message += 'These focuses have \n'
  message += `been active for ${displayTime(elapsed)}.\n`; 
  message += '\n';

  querySnapshot.forEach(doc => message += doc.data().name + '\n');

  message += '\n';
  message += 'Is this correct?';

  Alert.alert(
    title, message,
    [
      { 
        text: 'Cancel', 
        onPress: null,
      },
      { 
        text: 'Confirm', 
        onPress: () => updateExperience(dispatch, querySnapshot, elapsed),
      },
    ],
  );
};
