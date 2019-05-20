import { db, auth } from '../config/firebaseConfig'
import AsyncStorage from '@react-native-community/async-storage'
import { extend } from 'lodash-es'
import { USER_KEY, SET_USER } from '../constants/User'
import { SETTINGS_KEY, SET_SETTINGS } from '../constants/Settings'
import { CATEGORIES_KEY, SET_CATEGORIES } from '../constants/Categories'
import { STATS_KEY, SET_STATS } from '../constants/Stats'
import { FOCUSES_KEY, SET_FOCUSES } from '../constants/Focuses'
import { UPDATE_STATUS } from '../constants/Status';


export async function setUserData(dispatch, userData) {
  console.log('setUserData: \n')

  dispatch({ 
    type: SET_USER, 
    user: userData[USER_KEY]
  })
  dispatch({ 
    type: SET_SETTINGS, 
    settings: userData[SETTINGS_KEY]
  })
  dispatch({ 
    type: SET_CATEGORIES, 
    categories: userData[CATEGORIES_KEY]
  })
  dispatch({ 
    type: SET_STATS, 
    stats: userData[STATS_KEY]
  })
  dispatch({ 
    type: SET_FOCUSES, 
    focuses: userData[FOCUSES_KEY] 
  })

  console.log(userData)
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


export async function saveUserLocal(userData) {
  console.log('saveUserLocal: \n')

  const values = await AsyncStorage.multiGet(
    [USER_KEY, SETTINGS_KEY, CATEGORIES_KEY, STATS_KEY, FOCUSES_KEY]
  )

  const userCollection = { ...values[USER_KEY] }
  const settingsCollection = { ...values[SETTINGS_KEY] }
  const categoriesCollection = { ...values[CATEGORIES_KEY] }
  const statsCollection = { ...values[STATS_KEY] }
  const focusesCollection = { ...values[FOCUSES_KEY] }

  const user = { [auth.currentUser.uid]: userData[USER_KEY] }
  const settings = { [auth.currentUser.uid]: userData[SETTINGS_KEY] }
  const categories = { [auth.currentUser.uid]: userData[CATEGORIES_KEY] }
  const stats = { [auth.currentUser.uid]: userData[STATS_KEY] }
  const focuses = {}

  for (let [id, focus] of Object.entries(userData[FOCUSES_KEY])) {
    if (focus.userId === auth.currentUser.uid) {
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

  console.log(dataPairs)
}


export async function loadUserDB(dispatch) {
  dispatch({ type: UPDATE_STATUS, update: { userLoading: true } })
  const userData = await loadUserDataDB()
  setUserData(dispatch, userData)
  dispatch({ type: UPDATE_STATUS, update: { userLoading: false } })
}


export async function loadUserLocal(dispatch) {
  console.log('loadUserLocal: \n')

  dispatch({ type: UPDATE_STATUS, update: { userLoading: true } })
  const userData = await loadUserDataLocal()
  setUserData(dispatch, userData)
  dispatch({ type: UPDATE_STATUS, update: { userLoading: false } })

  console.log(userData)
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


export async function loadUserDataLocal() {
  const values = await AsyncStorage.multiGet(
    [USER_KEY, SETTINGS_KEY, CATEGORIES_KEY, STATS_KEY, FOCUSES_KEY]
  )

  const userCollectionRaw = values.find(pair => pair[0] === USER_KEY)
  const settingsCollectionRaw = values.find(pair => pair[0] === SETTINGS_KEY)
  const categoriesCollectionRaw = values.find(pair => pair[0] === CATEGORIES_KEY)
  const statsCollectionRaw = values.find(pair => pair[0] === STATS_KEY)
  const focusesCollectionRaw = values.find(pair => pair[0] === FOCUSES_KEY)

  const user = JSON.parse(userCollectionRaw[1])[auth.currentUser.uid]
  const settings = JSON.parse(settingsCollectionRaw[1])[auth.currentUser.uid]
  const categories = JSON.parse(categoriesCollectionRaw[1])[auth.currentUser.uid]
  const stats = JSON.parse(statsCollectionRaw[1])[auth.currentUser.uid]
  const focuses = JSON.parse(focusesCollectionRaw[1])

  for (const [id, focus] of Object.entries(focuses)) {
    if (focus.userId !== auth.currentUser.uid) {
      delete focuses[id]
    }
  }

  const userData = {
    [USER_KEY]: user,
    [SETTINGS_KEY]: settings,
    [CATEGORIES_KEY]: categories,
    [STATS_KEY]: stats,
    [FOCUSES_KEY]: focuses,
  }

  return userData
}
