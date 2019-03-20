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

export async function addCategory(dispatch, name) {
  const doc = db.collection('categories').doc(auth.currentUser.uid);

  await doc.update({ [name]: { show: true } }).catch(err);

  dispatch({ type: ADD_CATEGORY, name });
};

export async function updateCategory(dispatch, name, update) {
  const doc = db.collection('categories').doc(auth.currentUser.uid)

  await doc.update({ [name]: update }).catch(err);

  dispatch({ type: UPDATE_CATEGORY, name, update });
};

export async function deleteCategory(dispatch, name) {
  const doc = db.collection('categories').doc(auth.currentUser.uid)

  await doc.update({ 
    [name]: firebase.firestore.FieldValue.delete() 
  }).catch(err);

  await updateFocusCategories(dispatch, name, UNCATEGORIZED).catch(err);

  dispatch({ type: DELETE_CATEGORY, name });
};

export async function setCategoryName(dispatch, name, newName) {
  const categoryRef = db.collection('categories').doc(auth.currentUser.uid);

  await db.runTransaction(async transaction => {
    const doc = await transaction.get(categoryRef).catch(err);
    const currentCategory = doc.get(name);

    transaction.update(categoryRef, {
      [newName]: currentCategory,
      [name]: firebase.firestore.FieldValue.delete(),
    });
  }).catch(err);

  dispatch({ type: SET_CATEGORY_NAME, name, newName });
};