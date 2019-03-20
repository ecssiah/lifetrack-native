import { db, auth } from "../config/fbConfig";
import { err } from "../utils";
import NavigationService from "../services/NavigationService";
import { 
  ADD_FOCUS, 
  UPDATE_FOCUS, 
  DELETE_FOCUS,
  EXPERIENCE_PER_SECOND,
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

    querySnapshot.forEach(docSnapshot => {
      const focusRef = db.collection('focuses').doc(docSnapshot.id);
      batch.update(focusRef, { category: newName });
    });

    await batch.commit().catch(err);

    querySnapshot.forEach(docSnapshot => {
      dispatch({ 
        type: UPDATE_FOCUS, 
        id: docSnapshot.id, 
        focus: {...docSnapshot.data(), category: newName }
      });
    });
};

export async function updateExperience(dispatch, elapsed, querySnapshot) {
  let update = {};
  let promises = [];
  
  querySnapshot.forEach(docSnapshot => {
    const transactionPromise = db.runTransaction(async transaction => {
      const doc = await transaction.get(docSnapshot.ref).catch(err);
      const deltaExp = EXPERIENCE_PER_SECOND * elapsed;

      update[doc.id] = {
        level: doc.data().level,
        experience: doc.data().experience + deltaExp,
      };

      while (update[doc.id].experience >= 100) {
        update[doc.id].level++;
        update[doc.id].experience -= 100;
      }

      transaction.update(docSnapshot.ref, update[doc.id]);
    });

    promises.push(transactionPromise);
  });

  await Promise.all(promises).catch(err);

  for (const id in update) {
    dispatch({ type: UPDATE_FOCUS, id, update: update[id] });
  }
};