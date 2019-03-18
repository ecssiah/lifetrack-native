import { db, auth } from "../config/fbConfig";
import NavigationService from "../services/NavigationService";
import { 
  ADD_FOCUS, 
  UPDATE_FOCUS, 
  DELETE_FOCUS,
} from "../constants/Focuses";

export function addFocus(dispatch, focus) {
  db.collection('focuses').add(focus).then(doc => {
    dispatch({ type: ADD_FOCUS, id: doc.id, focus });
  }).catch(error => {
    console.error(error);
  });
};

export function deleteFocus(dispatch, id) {
  db.collection('focuses').doc(id).delete().then(() => {
    dispatch({ type: DELETE_FOCUS, id });

    NavigationService.navigate('Focuses');
  }).catch(error => {
    console.error(error);
  })
};

export function updateFocus(dispatch, id, updateFields) {
  db.collection('focuses').doc(id).update(updateFields).then(() => {
    dispatch({ type: UPDATE_FOCUS, id, updateFields }); 
  }).catch(error => {
    console.error(error);
  });
};

export function updateFocusCategories(dispatch, name, newName) {
  let query;
  query = db.collection('focuses');
  query = query.where('userId', '==', auth.currentUser.uid);
  query = query.where('category', '==', name);

  query.get().then(snapshot => {
    let batch = db.batch();

    snapshot.forEach(doc => {
      const focusRef = db.collection('focuses').doc(doc.id);
      batch.update(focusRef, { category: newName });
    });

    batch.commit().then(() => {
      snapshot.forEach(doc => {
        dispatch({ 
          type: UPDATE_FOCUS, 
          id: doc.id, 
          focus: {...doc.data(), category: newName }
        });
      })
    }).catch(error => {
      console.error(error);
    });
  });
};