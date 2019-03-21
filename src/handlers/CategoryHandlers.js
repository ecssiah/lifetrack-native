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
  return new Promise(async (resolve, reject) => {
    const doc = db.collection('categories').doc(auth.currentUser.uid);

    const category = {
      [name]: { show: true }
    };

    await doc.update(category).catch(error => {
      reject({ name, error });
    });

    dispatch({ type: ADD_CATEGORY, name, category });

    resolve();
  });
};

export async function updateCategory(dispatch, name, update) {
  return new Promise(async (resolve, reject) => {
    const doc = db.collection('categories').doc(auth.currentUser.uid);

    await doc.update({ [name]: update }).catch(error => {
      reject({ name, update, error });
    });

    dispatch({ type: UPDATE_CATEGORY, name, update });

    resolve();
  });
};

export async function deleteCategory(dispatch, name) {
  return new Promise(async (resolve, reject) => {
    const doc = db.collection('categories').doc(auth.currentUser.uid);

    const update = {
      [name]: firebase.firestore.FieldValue.delete(),
    };

    await doc.update(update).catch(error => {
      reject({ name, update, error });
    });
    await updateFocusCategories(dispatch, name, UNCATEGORIZED).catch(error => {
      reject(error);
    });

    dispatch({ type: DELETE_CATEGORY, name });

    resolve();
  });
};

export async function updateCategoryName(dispatch, name, newName) {
  return new Promise(async (resolve, reject) => {
    const categoriesRef = db.collection('categories').doc(auth.currentUser.uid);

    const transactionUpdateFunc = async transaction => {
      const doc = await transaction.get(categoriesRef).catch(error => {
        reject({ name, newName, error });
      });

      const category = doc.get(name);
      const update = {
        [newName]: category,
        [name]: firebase.firestore.FieldValue.delete(),
      };

      transaction.update(categoryRef, update);
    };

    await db.runTransaction(transactionUpdateFunc).catch(error => {
      reject({ name, newName, error });
    });

    await updateFocusCategories(dispatch, name, newName).catch(error => {
      reject({ name, newName, error });
    });

    dispatch({ type: UPDATE_CATEGORY_NAME, name, newName });

    resolve();
  });
};