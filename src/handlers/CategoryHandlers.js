import { db, auth } from '../config/fbConfig';
import { err } from '../utils';
import firebase from 'firebase';
import { 
  UNCATEGORIZED,
  ADD_CATEGORY, 
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  SET_CATEGORY_NAME,
} from "../constants/Categories";
import { updateFocusCategories } from './FocusesHandlers';

export function addCategory(dispatch, name) {
  const dbUpdate = {
    [name]: { show: true },
  };
  
  db.collection('categories').doc(auth.currentUser.uid).update(
    dbUpdate
  ).then(() => {
    dispatch({ type: ADD_CATEGORY, name });
  }).catch(err);
};

export function updateCategory(dispatch, name, update) {
  const dbUpdate = {
    [name]: update,
  };

  db.collection('categories').doc(auth.currentUser.uid).update(
    dbUpdate
  ).then(() => {
    dispatch({ type: UPDATE_CATEGORY, name, update });
  }).catch(err);
};

export function deleteCategory(dispatch, name) {
  const dbUpdate = {
    [name]: firebase.firestore.FieldValue.delete(),
  }
  
  db.collection('categories').doc(auth.currentUser.uid).update(
    dbUpdate
  ).then(() => {
    dispatch({ type: DELETE_CATEGORY, name });
    updateFocusCategories(dispatch, name, UNCATEGORIZED);
  }).catch(err);
};

export function setCategoryName(dispatch, name, newName) {
  const categoryRef = db.collection('categories').doc(auth.currentUser.uid);

  db.runTransaction(transaction => {
    return transaction.get(categoryRef).then(doc => {
      const currentCategory = doc.get(name);

      transaction.update(
        categoryRef,
        { 
          [newName]: currentCategory, 
          [name]: firebase.firestore.FieldValue.delete(),
        },
      );
    }).then(() => {
      dispatch({ type: SET_CATEGORY_NAME, name, newName });
    }).catch(err);
  });
};