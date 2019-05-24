import { db, auth } from '../config/firebaseConfig'
import AsyncStorage from '@react-native-community/async-storage'
import { USER_KEY, SET_USER } from '../constants/User'
import { SETTINGS_KEY, SET_SETTINGS } from '../constants/Settings'
import { CATEGORIES_KEY, SET_CATEGORIES } from '../constants/Categories'
import { STATS_KEY, SET_STATS } from '../constants/Stats'
import { FOCUSES_KEY, SET_FOCUSES } from '../constants/Focuses'


export async function clearAsyncStorage() {
  console.log('CLEAR ASYNC STORAGE')
  await AsyncStorage.multiRemove(
    [USER_KEY, SETTINGS_KEY, CATEGORIES_KEY, STATS_KEY, FOCUSES_KEY]
  )
}


export async function displayAsyncStorage() {
  console.log('DISPLAY ASYNC STORAGE')
  const keys = await AsyncStorage.getAllKeys()
  const values = (await AsyncStorage.multiGet(keys)).filter(value => 
    value[0] !== 'firebase:authUser:AIzaSyBtklAJ3LniqGDapAvQ5NoPUN58TwNpjYQ:[DEFAULT]'
  )

  for (const value of values) {
    console.log(value[0])
    console.log(JSON.parse(value[1]))
  }
}


export async function initLocal() {
  // clearAsyncStorage()
  displayAsyncStorage()

  const userCollection = await AsyncStorage.getItem(USER_KEY)
  const userDoesNotExist = userCollection === null

  if (userDoesNotExist) {
    const initData = [ 
      [ USER_KEY, JSON.stringify({}) ],
      [ SETTINGS_KEY, JSON.stringify({}) ],
      [ CATEGORIES_KEY, JSON.stringify({}) ],
      [ STATS_KEY, JSON.stringify({}) ],
      [ FOCUSES_KEY, JSON.stringify({}) ],
    ]

    AsyncStorage.multiSet(initData)
  }
}


export async function setUserData(dispatch, userData) {
  console.log('setUserData: \n')
  console.log(userData)

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
  console.log(`saveUserLocal: \n`)
  console.log(userData)

  await AsyncStorage.mergeItem(
    USER_KEY, 
    JSON.stringify({ [uid]: userData[USER_KEY] })
  )
  await AsyncStorage.mergeItem(
    SETTINGS_KEY, 
    JSON.stringify({ [uid]: userData[SETTINGS_KEY] })
  )
  await AsyncStorage.mergeItem(
    CATEGORIES_KEY, 
    JSON.stringify({ [uid]: userData[CATEGORIES_KEY] })
  )
  await AsyncStorage.mergeItem(
    STATS_KEY, 
    JSON.stringify({ [uid]: userData[STATS_KEY] })
  )
  await AsyncStorage.mergeItem(
    FOCUSES_KEY,
    JSON.stringify(userData[FOCUSES_KEY])
  )
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
  console.log(`loading user: ${auth.currentUser.uid}`)

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

  setUserData(dispatch, userData)
}


export async function loadUserDB(dispatch) {
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

  setUserData(dispatch, userData)
}

