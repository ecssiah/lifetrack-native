import { db, auth } from '../config/firebaseConfig'
import firebase from 'firebase'
import { 
  UNCATEGORIZED,
  ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY,
  UPDATE_CATEGORY_NAME,
} from "../constants/Categories"
import { updateFocusCategories } from './FocusesHandlers'

export async function addCategory(dispatch, name) {
  const category = {
    [name]: { show: true }
  }

  const doc = db.collection('categories').doc(auth.currentUser.uid)
  await doc.update(category)

  dispatch({ type: ADD_CATEGORY, name, category: category[name] })
}

export async function updateCategory(dispatch, name, update) {
  const doc = db.collection('categories').doc(auth.currentUser.uid)
  await doc.update({ [name]: update })

  dispatch({ type: UPDATE_CATEGORY, name, update })
}

export async function deleteCategory(dispatch, name) {
  const update = {
    [name]: firebase.firestore.FieldValue.delete(),
  }

  const doc = db.collection('categories').doc(auth.currentUser.uid)
  await doc.update(update)

  await updateFocusCategories(dispatch, name, UNCATEGORIZED)

  dispatch({ type: DELETE_CATEGORY, name })
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