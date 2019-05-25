import { db, auth } from '../config/firebaseConfig'
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase'
import { 
  UNCATEGORIZED,
  ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY,
  UPDATE_CATEGORY_NAME,
  CATEGORIES_KEY,
} from "../constants/Categories"
import { updateFocusCategories } from './FocusesHandlers'


export function addCategory(dispatch, name) {
  const category = {
    focusVisible: true,
    statVisible: false,
  }

  dispatch({ type: ADD_CATEGORY, name, category })
}


export async function addCategoryDB(name) {
  const category = {
    [name]: {
      focusVisible: true,
      statVisible: false,
    }
  }

  const doc = db.collection('categories').doc(auth.currentUser.uid)
  doc.update(category)
}


export async function addCategoryLocal(name) {
  console.log('addCategoryLocal: \n')

  const category = {
    [name]: {
      focusVisible: true,
      statVisible: false,
    }
  }

  await AsyncStorage.mergeItem(
    CATEGORIES_KEY, JSON.stringify({ [auth.currentUser.uid]: category })
  )
}


export function updateCategory(dispatch, name, update) {
  console.log('updateCategory: \n')
  console.log(name, update)

  dispatch({ type: UPDATE_CATEGORY, name, update })
}


export async function updateCategoryDB(name, update) {
  const categoriesRef = db.collection('categories').doc(auth.currentUser.uid)

  const transactionUpdateFunc = async transaction => {
    const doc = await transaction.get(categoriesRef)
    const category = doc.data()

    const dbUpdate = {
      [name]: Object.assign({}, category[name], update)
    }

    transaction.update(categoriesRef, dbUpdate)
  }

  await db.runTransaction(transactionUpdateFunc)
}


export async function updateCategoryLocal(name, update) {
  console.log('updateCategoryLocal: \n')
  console.log(name, update) 

  const category = {
    [name]: update,
  }

  await AsyncStorage.mergeItem(
    CATEGORIES_KEY, JSON.stringify({ [auth.currentUser.uid]: category })
  )
}


export function deleteCategory(dispatch, name) {
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


export async function deleteCategoryLocal(dispatch, name) {
  console.log('deleteCategoryLocal: \n')

  const categoryCollectionRaw = await AsyncStorage.getItem(CATEGORIES_KEY)
  const categoryCollection = JSON.parse(categoryCollectionRaw)

  delete categoryCollection[auth.currentUser.uid][name]

  await AsyncStorage.setItem(
    CATEGORIES_KEY, JSON.stringify(categoryCollection)
  )

  updateFocusCategories(dispatch, name, UNCATEGORIZED)
}


export async function updateCategoryName(dispatch, name, newName) {
  const categoryCollectionRaw = await AsyncStorage.getItem(CATEGORIES_KEY)
  const categoryCollection = JSON.parse(categoryCollectionRaw)

  const category = { ...categoryCollection[auth.currentUser.uid][name] }

  categoryCollection[auth.currentUser.uid][newName] = category
  delete categoryCollection[auth.currentUser.uid][name]

  await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categoryCollection))
  await updateFocusCategories(dispatch, name, newName)

  dispatch({ type: UPDATE_CATEGORY_NAME, name, newName })
}

