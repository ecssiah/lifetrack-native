import { db, auth } from "../config/fbConfig";
import { err } from "../utils";
import NavigationService from "../services/NavigationService";
import { 
  ADD_FOCUS, 
  UPDATE_FOCUS, 
  DELETE_FOCUS,
  EXPERIENCE_PER_SECOND,
} from "../constants/Focuses";

export function addFocus(dispatch, focus) {
  db.collection('focuses').add(focus).then(doc => {
    dispatch({ type: ADD_FOCUS, id: doc.id, focus });
  }).catch(error => err(error));
};

export function deleteFocus(dispatch, id) {
  db.collection('focuses').doc(id).delete().then(() => {
    dispatch({ type: DELETE_FOCUS, id });

    NavigationService.navigate('Focuses');
  }).catch(error => err(error));
};

export function updateFocus(dispatch, id, update) {
  db.collection('focuses').doc(id).update(update).then(() => {
    dispatch({ type: UPDATE_FOCUS, id, update }); 
  }).catch(error => err(error));
};

export function updateFocusCategories(dispatch, name, newName) {
  let query;
  query = db.collection('focuses');
  query = query.where('userId', '==', auth.currentUser.uid);
  query = query.where('category', '==', name);

  query.get().then(querySnapshot => {
    let batch = db.batch();

    querySnapshot.forEach(docSnapshot => {
      const focusRef = db.collection('focuses').doc(docSnapshot.id);
      batch.update(focusRef, { category: newName });
    });

    batch.commit().then(() => {
      querySnapshot.forEach(docSnapshot => {
        dispatch({ 
          type: UPDATE_FOCUS, 
          id: docSnapshot.id, 
          focus: {...docSnapshot.data(), category: newName }
        });
      })
    }).catch(error => err(error));
  });
};

export function updateExperience(dispatch, elapsed, querySnapshot) {
  let update = {};
  let promises = [];
  
  querySnapshot.forEach(docSnapshot => {
    const transactionPromise = db.runTransaction(async transaction => {
      const doc = await transaction.get(docSnapshot.ref);
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
    }).catch(error => err(error));

    promises.push(transactionPromise);
  });

  Promise.all(promises).then(() => {
    for (const id in update) {
      dispatch({ type: UPDATE_FOCUS, id, update: update[id] });
    }
  }).catch(error => err(error));
};