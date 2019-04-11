import { db, auth } from '../config/firebaseConfig'
import firebase from 'firebase'
import { 
  UNCATEGORIZED,
  ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY,
  UPDATE_CATEGORY_NAME,
} from "../constants/Categories"
import { updateFocusCategories } from './FocusesHandlers'


export function addCategory(name, update) {
  dispatch({ type: ADD_CATEGORY, name, update })
}


export async function addCategoryDB(name, update) {
  const categoryItem = {
    [name]: update,
  }

  const doc = db.collection('categories').doc(auth.currentUser.uid)
  doc.update(categoryItem)
}


export function updateCategory(name, update) {
  dispatch({ type: UPDATE_CATEGORY, name, update })
}


export async function updateCategoryDB(name, update) {
  const doc = db.collection('categories').doc(auth.currentUser.uid)
  doc.update({ [name]: update })
}


export function deleteCategory(name) {
  dispatch({ type: DELETE_CATEGORY, name })
}


export async function deleteCategoryDB(dispatch, name) {
  const update = {
    [name]: firebase.firestore.FieldValue.delete(),
  }

  const doc = db.collection('categories').doc(auth.currentUser.uid)
  await doc.update(update)

  updateFocusCategories(dispatch, name, UNCATEGORIZED)
}


export async function updateCategoryName(dispatch, name, newName) {
  const categoriesRef = db.collection('categories').doc(auth.currentUser.uid)

  const transactionUpdateFunc = async transaction => {
    const doc = await transaction.get(categoriesRef)
    const categoryName = doc.get(name)

    const update = {
      [newName]: categoryName,
      [name]: firebase.firestore.FieldValue.delete(),
    }

    transaction.update(categoryRef, update)
  }

  await db.runTransaction(transactionUpdateFunc)

  await updateFocusCategories(dispatch, name, newName)

  dispatch({ type: UPDATE_CATEGORY_NAME, name, newName })
}