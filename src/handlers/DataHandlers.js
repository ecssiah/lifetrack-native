import { extend } from 'lodash-es'
import { db, auth } from '../config/firebaseConfig'
import AsyncStorage from '@react-native-community/async-storage'
import { USER_KEY, SET_USER } from '../constants/User'
import { SETTINGS_KEY, SET_SETTINGS } from '../constants/Settings'
import { CATEGORIES_KEY, SET_CATEGORIES } from '../constants/Categories'
import { STATS_KEY, SET_STATS } from '../constants/Stats'
import { FOCUSES_KEY, SET_FOCUSES } from '../constants/Focuses'


export async function setUserData(dispatch, userData) {
  if (userData[USER_KEY]) {
    dispatch({ type: SET_USER, user: userData[USER_KEY] })
  }
  if (userData[SETTINGS_KEY]) {
    dispatch({ type: SET_SETTINGS, settings: userData[SETTINGS_KEY] })
  }
  if (userData[CATEGORIES_KEY]) {
    dispatch({ type: SET_CATEGORIES, categories: userData[CATEGORIES_KEY] })
  }
  if (userData[STATS_KEY]) {
    dispatch({ type: SET_STATS, stats: userData[STATS_KEY] })
  }
  if (userData[FOCUSES_KEY]) {
    dispatch({ type: SET_FOCUSES, focuses: userData[FOCUSES_KEY] })
  }
}


export async function saveUserLocal(uid, userData) {
  const values = await AsyncStorage.multiGet(
    [USER_KEY, SETTINGS_KEY, CATEGORIES_KEY, STATS_KEY, FOCUSES_KEY]
  )

  const userCollection = { ...values[USER_KEY] }
  const settingsCollection = { ...values[SETTINGS_KEY] }
  const categoriesCollection = { ...values[CATEGORIES_KEY] }
  const statsCollection = { ...values[STATS_KEY] }
  const focusesCollection = { ...values[FOCUSES_KEY] }

  const user = { [uid]: userData[USER_KEY] }
  const settings = { [uid]: userData[SETTINGS_KEY] }
  const categories = { [uid]: userData[CATEGORIES_KEY] }
  const stats = { [uid]: userData[STATS_KEY] }

  const focuses = {}
  for (let [id, focus] of Object.entries(userData[FOCUSES_KEY])) {
    if (focus.userId === uid) {
      focuses[id] = focus
    }
  }

  extend(userCollection, user)
  extend(settingsCollection, settings)
  extend(categoriesCollection, categories)
  extend(statsCollection, stats)
  extend(focusesCollection, focuses)

  const dataPairs = [
    [USER_KEY, JSON.stringify(userCollection)],
    [SETTINGS_KEY, JSON.stringify(settingsCollection)],
    [CATEGORIES_KEY, JSON.stringify(categoriesCollection)],
    [STATS_KEY, JSON.stringify(statsCollection)],
    [FOCUSES_KEY, JSON.stringify(focusesCollection)],
  ]

  await AsyncStorage.multiSet(dataPairs)
}


export async function saveUserDB(userData) {
  const userDoc = db.collection('user').doc(auth.currentUser.uid)
  const settingsDoc = db.collection('settings').doc(auth.currentUser.uid) 
  const categoriesDoc = db.collection('categories').doc(auth.currentUser.uid)
  const statsDoc = db.collection('stats').doc(auth.currentUser.uid)

  return Promise.all([
    userDoc.set(userData[USER_KEY]),
    settingsDoc.set(userData[SETTINGS_KEY]),
    categoriesDoc.set(userData[CATEGORIES_KEY]),
    statsDoc.set(userData[STATS_KEY]),
  ])
}


export async function loadUserLocal(dispatch) {
  const userData = await loadUserDataLocal()
  setUserData(dispatch, userData)
}


export async function loadUserDataLocal() {
  const values = await AsyncStorage.multiGet(
    [USER_KEY, SETTINGS_KEY, CATEGORIES_KEY, STATS_KEY]
  )

  const userCollectionRaw = values.find(pair => pair[0] === USER_KEY)
  const settingsCollectionRaw = values.find(pair => pair[0] === SETTINGS_KEY)
  const categoriesCollectionRaw = values.find(pair => pair[0] === CATEGORIES_KEY)
  const statsCollectionRaw = values.find(pair => pair[0] === STATS_KEY)
  const focusesCollectionRaw = await AsyncStorage.getItem(FOCUSES_KEY)

  const userCollection = JSON.parse(userCollectionRaw[1])
  const settingsCollection = JSON.parse(settingsCollectionRaw[1])
  const categoriesCollection = JSON.parse(categoriesCollectionRaw[1])
  const statsCollection = JSON.parse(statsCollectionRaw[1])
  const focusesCollection = JSON.parse(focusesCollectionRaw)

  for (const [id, focus] of Object.entries(focusesCollection)) {
    if (focus.userId !== auth.currentUser.uid) {
      delete focusesCollection[id]
    }
  }

  const userData = {
    [USER_KEY]: userCollection[auth.currentUser.uid],
    [SETTINGS_KEY]: settingsCollection[auth.currentUser.uid],
    [CATEGORIES_KEY]: categoriesCollection[auth.currentUser.uid],
    [STATS_KEY]: statsCollection[auth.currentUser.uid],
    [FOCUSES_KEY]: focusesCollection,
  }

  return userData
}


export async function loadUserDB(dispatch) {
  const userData = await loadUserDataDB()
  setUserData(dispatch, userData)
}


export async function loadUserDataDB() {
  const userDoc = db.collection('user').doc(auth.currentUser.uid)
  const settingsDoc = db.collection('settings').doc(auth.currentUser.uid)
  const categoriesDoc = db.collection('categories').doc(auth.currentUser.uid)
  const statsDoc = db.collection('stats').doc(auth.currentUser.uid)

  let focusesQuery = db.collection('focuses')
  focusesQuery = focusesQuery.where('userId', '==', auth.currentUser.uid)

  const userDataRaw = await Promise.all([
    userDoc.get(),
    settingsDoc.get(),
    categoriesDoc.get(),
    statsDoc.get(),
    focusesQuery.get(),
  ])

  const userData = {
    [USER_KEY]: userDataRaw[0].data(),
    [SETTINGS_KEY]: userDataRaw[1].data(),
    [CATEGORIES_KEY]: userDataRaw[2].data(),
    [STATS_KEY]: userDataRaw[3].data(),
    [FOCUSES_KEY]: userDataRaw[4].data(),
  }
  
  return userData
}

