import { db, auth } from "../config/fbConfig";
import NavigationService from "../services/NavigationService";
import { 
  ADD_FOCUS, 
  UPDATE_FOCUS, 
  DELETE_FOCUS,
} from "../constants/Focuses";
import { err } from "../utils";

export function addFocus(dispatch, focus) {
  db.collection('focuses').add(focus).then(doc => {
    dispatch({ type: ADD_FOCUS, id: doc.id, focus });
  }).catch(err);
};

export function deleteFocus(dispatch, id) {
  db.collection('focuses').doc(id).delete().then(() => {
    dispatch({ type: DELETE_FOCUS, id });

    NavigationService.navigate('Focuses');
  }).catch(err);
};

export function updateFocus(dispatch, id, update) {
  db.collection('focuses').doc(id).update(update).then(() => {
    dispatch({ type: UPDATE_FOCUS, id, update }); 
  }).catch(err);
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
    }).catch(err);
  });
};

export function updateExperience(dispatch, elapsed, querySnapshot) {
  const batch = db.batch();

  let update = {};
  let focuses = {};

  querySnapshot.forEach(docSnapshot => {
    const docId = docSnapshot.id;

    update[docId] = {};
    focuses[docId] = {...docSnapshot.data()};

    const deltaExp = EXPERIENCE_PER_SECOND * elapsed;

    update[docId].level = focuses[docId].level;
    update[docId].experience = focuses[docId].experience + deltaExp;

    while (update[docId].experience >= 100) {
      update[docId].level += 1;
      update[docId].experience -= 100;
    }

    batch.update(db.collection('focuses').doc(docId), update[docId]);
  });

  batch.commit().then(() => {
    for (const id in update) {
      dispatch({ type: UPDATE_FOCUS, id, update: update[id] });
    }
  }).catch(err);
};