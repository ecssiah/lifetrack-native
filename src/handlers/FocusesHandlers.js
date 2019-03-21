import { db, auth } from "../config/firebaseConfig";
import { err } from "../utils";
import NavigationService from "../services/NavigationService";
import { 
  EXPERIENCE_PER_SECOND,
  ADD_FOCUS, UPDATE_FOCUS, DELETE_FOCUS,
} from "../constants/Focuses";

export async function addFocus(dispatch, focus) {
  const doc = await db.collection('focuses').add(focus).catch(err);

  dispatch({ type: ADD_FOCUS, id: doc.id, focus });
};

export async function deleteFocus(dispatch, id) {
  await db.collection('focuses').doc(id).delete().catch(err);

  dispatch({ type: DELETE_FOCUS, id });

  NavigationService.navigate('Focuses');
};

export async function updateFocus(dispatch, id, update) {
  await db.collection('focuses').doc(id).update(update).catch(err);

  dispatch({ type: UPDATE_FOCUS, id, update }); 
};

export async function updateFocusCategories(dispatch, name, newName) {
  let query;
  query = db.collection('focuses');
  query = query.where('userId', '==', auth.currentUser.uid);
  query = query.where('category', '==', name);

  const querySnapshot = await query.get().catch(err);

  const batch = db.batch();
  querySnapshot.forEach(doc => batch.update(doc.ref, { category: newName }));

  await batch.commit().catch(err);

  querySnapshot.forEach(doc => {
    dispatch({ 
      type: UPDATE_FOCUS, id: doc.id, 
      focus: {...doc.data(), category: newName }
    });
  });
};

export async function updateExperience(dispatch, querySnapshot, elapsed) {
  let update = {};
  let promises = [];
  
  querySnapshot.forEach(doc => {
    const transactionPromise = db.runTransaction(async transaction => {
      const deltaExp = EXPERIENCE_PER_SECOND * elapsed;
      const docSnapshot = await transaction.get(doc.ref).catch(err);

      update[docSnapshot.id] = {
        level: docSnapshot.data().level,
        experience: docSnapshot.data().experience + deltaExp,
      };

      while (update[docSnapshot.id].experience >= 100) {
        update[docSnapshot.id].level++;
        update[docSnapshot.id].experience -= 100;
      }

      transaction.update(docSnapshot.ref, update[docSnapshot.id]);
    });

    promises.push(transactionPromise);
  });

  await Promise.all(promises).catch(err);

  for (const id in update) {
    dispatch({ type: UPDATE_FOCUS, id, update: update[id] });
  }
};