import { db, auth } from '../config/fbConfig';
import firebase from 'firebase';
import { 
  ADD_CATEGORY, 
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  SET_CATEGORY_SHOW,
  UNCATEGORIZED,
} from "../constants/Categories";
import { updateFocusCategories } from './FocusesHandlers';

export function addCategoryHandler(dispatch, name) {
  const categoryUpdate = {};
  categoryUpdate[name] = { 
    show: true 
  };
  
  db.collection('categories').doc(auth.currentUser.uid).update(
    categoryUpdate
  ).then(() => {
    dispatch({ type: ADD_CATEGORY, name });
  }).catch(error => {
    console.error(error);
  });
};

export function updateCategoryHandler(dispatch, category, name, newName) {
  const categoryUpdate = {};
  categoryUpdate[newName] = category; 
  categoryUpdate[name] = firebase.firestore.FieldValue.delete();

  db.collection('categories').doc(auth.currentUser.uid).update(
    categoryUpdate
  ).then(() => {
    dispatch({ type: UPDATE_CATEGORY, category, name, newName });

    updateFocusCategories(dispatch, name, newName);
  }).catch(error => {
    console.error(error);
  });
};

export function deleteCategoryHandler(dispatch, name) {
  const categoryUpdate = {};
  categoryUpdate[name] = firebase.firestore.FieldValue.delete();
  
  db.collection('categories').doc(auth.currentUser.uid).update(
    categoryUpdate
  ).then(() => {
    dispatch({ type: DELETE_CATEGORY, name });

    updateFocusCategories(dispatch, name, UNCATEGORIZED);
  }).catch(error => {
    console.error(error);
  });
};

export function setCategoryShowHandler(dispatch, name, show) {
  const categoryUpdate = {};
  categoryUpdate[name] = { show };

  db.collection('categories').doc(auth.currentUser.uid).update(
    categoryUpdate
  ).then(() => {
    dispatch({ type: SET_CATEGORY_SHOW, name, show });
  }).catch(error => {
    console.error(error);
  }); 
};