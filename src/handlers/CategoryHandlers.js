import { db, auth } from '../config/firebaseConfig';
import { err } from '../utils';
import firebase from 'firebase';
import { 
  UNCATEGORIZED,
  ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY,
  UPDATE_CATEGORY_NAME,
} from "../constants/Categories";
import { updateFocusCategories } from './FocusesHandlers';

export async function addCategory(dispatch, name) {
  const doc = db.collection('categories').doc(auth.currentUser.uid);

  const category = {
    [name]: { show: true }
  };

  await doc.update(category).catch(err);

  dispatch({ type: ADD_CATEGORY, name, category });
};

export async function updateCategory(dispatch, name, update) {
  const doc = db.collection('categories').doc(auth.currentUser.uid);

  await doc.update({ [name]: update }).catch(err);

  dispatch({ type: UPDATE_CATEGORY, name, update });
};

export async function deleteCategory(dispatch, name) {
  const doc = db.collection('categories').doc(auth.currentUser.uid);

  const update = {
    [name]: firebase.firestore.FieldValue.delete(),
  };

  await doc.update(update).catch(err);
  await updateFocusCategories(dispatch, name, UNCATEGORIZED).catch(err);

  dispatch({ type: DELETE_CATEGORY, name });
};

export async function updateCategoryName(dispatch, name, newName) {
  const categoriesRef = db.collection('categories').doc(auth.currentUser.uid);

  await db.runTransaction(async transaction => {
    const doc = await transaction.get(categoriesRef).catch(err);
    const category = doc.get(name);

    const update = {
      [newName]: category,
      [name]: firebase.firestore.FieldValue.delete(),
    };

    transaction.update(categoryRef, update);
  }).catch(err);

  await updateFocusCategories(dispatch, name, newName).catch(err);

  dispatch({ type: UPDATE_CATEGORY_NAME, name, newName });
};