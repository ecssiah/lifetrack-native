import { db, auth } from '../config/firebaseConfig'
import { extend } from 'lodash-es'
import firebase from 'firebase'
import { 
  UNCATEGORIZED,
  ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY,
  UPDATE_CATEGORY_NAME,
  CATEGORIES_KEY,
} from "../constants/Categories"
import { updateFocusCategories } from './FocusesHandlers'
import AsyncStorage from '@react-native-community/async-storage';


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
  try {
    const categoryCollectionRaw = await AsyncStorage.getItem(CATEGORIES_KEY)
    const categoryCollection = JSON.parse(categoryCollectionRaw)

    const category = {
      [name]: {
        focusVisible: true,
        statVisible: false,
      }
    }

    extend(categoryCollection[auth.currentUser.uid], category)

    await AsyncStorage.setItem(
      CATEGORIES_KEY, JSON.stringify(categoryCollection)
    )
  } catch(e) {
    console.error('addCategoryLocal: ', e)
  }
}


export function updateCategory(dispatch, name, update) {
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
  try {
    const categoryCollectionRaw = await AsyncStorage.getItem(CATEGORIES_KEY)
    const categoryCollection = JSON.parse(categoryCollectionRaw)

    extend(categoryCollection[auth.currentUser.uid][name], update)

    await AsyncStorage.setItem(
      CATEGORIES_KEY, JSON.stringify(categoryCollection)
    )
  } catch(e) {
    console.error('updateCategoryLocal: ', e)
  }
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
  try {
    const categoryCollectionRaw = await AsyncStorage.getItem(CATEGORIES_KEY)
    const categoryCollection = JSON.parse(categoryCollectionRaw)

    delete categoryCollection[auth.currentUser.uid][name]

    await AsyncStorage.setItem(
      CATEGORIES_KEY, JSON.stringify(categoryCollection)
    )

    updateFocusCategories(dispatch, name, UNCATEGORIZED)
  } catch(e) {
    console.error('deleteCategoryLocal: ', e)
  }
}


export async function updateCategoryName(dispatch, name, newName) {
  try {
    const categoryCollectionRaw = await AsyncStorage.getItem(CATEGORIES_KEY)
    const categoryCollection = JSON.parse(categoryCollectionRaw)
    const category = { ...categoryCollection[auth.currentUser.uid][name] }

    categoryCollection[auth.currentUser.uid][newName] = category
    delete categoryCollection[auth.currentUser.uid][name]

    await AsyncStorage.setItem(
      CATEGORIES_KEY, JSON.stringify(categoryCollection)
    )
    await updateFocusCategories(dispatch, name, newName)

    dispatch({ type: UPDATE_CATEGORY_NAME, name, newName })
  } catch(e) {
    console.error('updateCategoryName: ', e)
  }
}

