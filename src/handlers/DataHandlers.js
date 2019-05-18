import { db, auth } from '../config/firebaseConfig'
import { extend } from 'lodash-es'
import AsyncStorage from '@react-native-community/async-storage'
import { resetFocuses } from './FocusesHandlers';
import { USER_KEY, SET_USER } from '../constants/User'
import { SETTINGS_KEY, SET_SETTINGS } from '../constants/Settings'
import { CATEGORIES_KEY, SET_CATEGORIES } from '../constants/Categories'
import { STATS_KEY, SET_STATS } from '../constants/Stats'
import { FOCUSES_KEY, SET_FOCUSES } from '../constants/Focuses'


export async function setUserData(dispatch, userData) {
  dispatch({ type: SET_USER, user: userData[USER_KEY] })
  dispatch({ type: SET_SETTINGS, settings: userData[SETTINGS_KEY] })
  dispatch({ type: SET_CATEGORIES, categories: userData[CATEGORIES_KEY] })
  dispatch({ type: SET_STATS, stats: userData[STATS_KEY] })
  dispatch({ type: SET_FOCUSES, focuses: userData[FOCUSES_KEY] })
}

export async function setUserDataDB(userData) {
  const userDoc = db.collection('user').doc(auth.currentUser.uid)
  const settingsDoc = db.collection('settings').doc(auth.currentUser.uid) 
  const categoriesDoc = db.collection('categories').doc(auth.currentUser.uid)
  const statsDoc = db.collection('stats').doc(auth.currentUser.uid)

  return Promise.all([
    userDoc.set(userData.user),
    settingsDoc.set(userData.settings),
    categoriesDoc.set(userData.categories),
    statsDoc.set(userData.stats),
  ])
}


export async function setUserDataLocal(userData) {
  let values
  try {
    values = await AsyncStorage.multiGet(
      [USER_KEY, SETTINGS_KEY, CATEGORIES_KEY, STATS_KEY, FOCUSES_KEY]
    )
  } catch(e) {
    console.error('setUserDataLocal: multiGet', e)
  }

  const userCollection = { ...values[USER_KEY] }
  const settingsCollection = { ...values[SETTINGS_KEY] }
  const categoriesCollection = { ...values[CATEGORIES_KEY] }
  const statsCollection = { ...values[STATS_KEY] }
  const focusesCollection = { ...values[FOCUSES_KEY] }

  const user = { [auth.currentUser.uid]: userData.user }
  const settings = { [auth.currentUser.uid]: userData.settings }
  const categories = { [auth.currentUser.uid]: userData.categories }
  const stats = { [auth.currentUser.uid]: userData.stats }

  const focuses = {}
  for (let [k, v] of Object.entries(userData.focuses)) {
    focuses[k] = v
  }

  extend(userCollection, user)
  extend(settingsCollection, settings)
  extend(categoriesCollection, categories)
  extend(statsCollection, stats)
  extend(focusesCollection, focuses)

  const userPair = [USER_KEY, JSON.stringify(userCollection)]
  const settingsPair = [SETTINGS_KEY, JSON.stringify(settingsCollection)]
  const categoriesPair = [CATEGORIES_KEY, JSON.stringify(categoriesCollection)]
  const statsPair = [STATS_KEY, JSON.stringify(statsCollection)]
  const focusesPair = [FOCUSES_KEY, JSON.stringify(focusesCollection)]

  try {
    await AsyncStorage.multiSet([
      userPair, settingsPair, categoriesPair, statsPair, focusesPair
    ])
  } catch(e) {
    console.error('setUserDataLocal: multiSet', e)
  }
}


export async function loadUser(dispatch) {
  const userData = await loadUserData()
  await resetFocuses(dispatch, userData[FOCUSES_KEY])
  setUserData(dispatch, userData)
}


export async function loadUserLocal(dispatch) {
  const userData = await loadUserDataLocal()
  await resetFocuses(dispatch, userData[FOCUSES_KEY])
  setUserData(dispatch, userData)
}


export async function loadUserData() {
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


export async function loadUserDataLocal() {
  let values
  try {
    values = await AsyncStorage.multiGet(
      [USER_KEY, SETTINGS_KEY, CATEGORIES_KEY, STATS_KEY, FOCUSES_KEY]
    )
  } catch(e) {
    console.error('loadUserDataLocal', e)
  }

  const userCollection = values.find(pair => pair[0] === USER_KEY)
  const user = JSON.parse(userCollection[1])[auth.currentUser.uid]

  const settingsCollection = values.find(pair => pair[0] === SETTINGS_KEY)
  const settings = JSON.parse(settingsCollection[1])[auth.currentUser.uid]

  const categoriesCollection = values.find(pair => pair[0] === CATEGORIES_KEY)
  const categories = JSON.parse(categoriesCollection[1])[auth.currentUser.uid]

  const statsCollection = values.find(pair => pair[0] === STATS_KEY)
  const stats = JSON.parse(statsCollection[1])[auth.currentUser.uid]

  const focusesCollection = values.find(pair => pair[0] === FOCUSES_KEY)
  const focuses = JSON.parse(focusesCollection[1])
  
  const userData = {
    [USER_KEY]: user,
    [SETTINGS_KEY]: settings,
    [CATEGORIES_KEY]: categories,
    [STATS_KEY]: stats,
    [FOCUSES_KEY]: focuses,
  }

  return userData
}
