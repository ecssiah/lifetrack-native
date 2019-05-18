import { db, auth } from '../config/firebaseConfig'
import AsyncStorage from '@react-native-community/async-storage';
import { getDay } from '../../lib/utils';
import { extend } from 'lodash-es'
import { 
  DEFAULT_WORK_PERIOD, DEFAULT_WORK_GOAL, DEFAULT_BREAK_PERIOD
} from '../constants/Settings'
import { UNCATEGORIZED } from '../constants/Categories'
import { SET_CATEGORIES, CATEGORIES_KEY } from '../constants/Categories'
import { SET_SETTINGS, SETTINGS_KEY } from '../constants/Settings'
import { SET_USER, USER_KEY } from '../constants/User'
import { SET_STATS, STATS_KEY } from '../constants/Stats';
import { SET_FOCUSES, FOCUSES_KEY } from '../constants/Focuses';


export async function signUp(dispatch, email, password) {
  await auth.createUserWithEmailAndPassword(email, password)

  const startDate = getDay().getTime()
  const endDate = getDay(6).getTime()

  const userData = {
    user: {
      email,
      startDate,
      nextChartColor: 0,
    },
    settings: {
      workPeriod: DEFAULT_WORK_PERIOD,
      workGoal: DEFAULT_WORK_GOAL,
      breakPeriod: DEFAULT_BREAK_PERIOD,
    },
    categories: {
      [UNCATEGORIZED]: { 
        focusVisible: true, 
        statVisible: true,
      },
    },
    stats: {
      startDate,
      endDate,
    },
    focuses: {},
  }

  setUserDataLocal(userData)

  dispatch({ type: SET_USER, user: userData.user })
  dispatch({ type: SET_SETTINGS, settings: userData.settings })
  dispatch({ type: SET_CATEGORIES, categories: userData.categories })
  dispatch({ type: SET_STATS, stats: userData.stats })
  dispatch({ type: SET_FOCUSES, focuses: userData.focuses })
}


export async function signIn(dispatch, email, password) {
  await auth.signInWithEmailAndPassword(email, password)
  loadUserDataLocal(dispatch)
}


async function setUserData(userData) {
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


async function setUserDataLocal(userData) {
  let values
  try {
    values = await AsyncStorage.multiGet(
      [USER_KEY, SETTINGS_KEY, CATEGORIES_KEY, STATS_KEY, FOCUSES_KEY]
    )
  } catch(e) {
    console.warn(e)
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
    console.warn(e)
  }
}


export async function signOut() {
  let query = db.collection('focuses')
  query = query.where('userId', '==', auth.currentUser.uid)
  query = query.where('active', '==', true)

  const promises = []
  const querySnapshot = await query.get()

  querySnapshot.forEach(doc => {
    const transactionUpdateFunc = async transaction => {
      const docSnapshot = await transaction.get(doc.ref)

      const update = {
        active: false,
        working: true,
        time: docSnapshot.data().workPeriod * 60,
      }

      transaction.update(doc.ref, update)
    }

    promises.push(db.runTransaction(transactionUpdateFunc))
  })

  await Promise.all(promises)
  auth.signOut()
}


export async function loadUser(dispatch) {
  const userData = await loadUserData()

  const user = userData[0].data()
  const settings = userData[1].data()
  const categories = userData[2].data()
  const stats = userData[3].data()

  userData[4].forEach(doc => {
    const focus = { ...doc.data() }

    focus.active = false
    focus.working = true
    focus.time = 60 * focus.workPeriod
    focus.timer = null

    focuses[doc.id] = focus
  })

  dispatch({ type: SET_USER, user })
  dispatch({ type: SET_SETTINGS, settings })
  dispatch({ type: SET_CATEGORIES, categories })
  dispatch({ type: SET_STATS, stats })
  dispatch({ type: SET_FOCUSES, focuses })
}


export async function loadUserLocal(dispatch) {
  const userData = await loadUserDataLocal()

  const user = userData[USER_KEY]
  const settings = userData[SETTINGS_KEY]
  const categories = userData[CATEGORIES_KEY]
  const stats = userData[STATS_KEY]
  const focuses = userData[FOCUSES_KEY]

  dispatch({ type: SET_USER, user })
  dispatch({ type: SET_SETTINGS, settings })
  dispatch({ type: SET_CATEGORIES, categories })
  dispatch({ type: SET_STATS, stats })
  dispatch({ type: SET_FOCUSES, focuses })
}


async function loadUserData() {
  const userDoc = db.collection('user').doc(auth.currentUser.uid)
  const settingsDoc = db.collection('settings').doc(auth.currentUser.uid)
  const categoriesDoc = db.collection('categories').doc(auth.currentUser.uid)
  const statsDoc = db.collection('stats').doc(auth.currentUser.uid)

  let focusesQuery = db.collection('focuses')
  focusesQuery = focusesQuery.where('userId', '==', auth.currentUser.uid)

  return Promise.all([
    userDoc.get(),
    settingsDoc.get(),
    categoriesDoc.get(),
    statsDoc.get(),
    focusesQuery.get()
  ])
}


async function loadUserDataLocal() {
  let values
  try {
    values = await AsyncStorage.multiGet(
      [USER_KEY, SETTINGS_KEY, CATEGORIES_KEY, STATS_KEY, FOCUSES_KEY]
    )
  } catch(e) {
    console.warn(e)
  }

  const userCollection = values.find(pair => pair[0] === USER_KEY)
  const userDoc = JSON.parse(userCollection[1])[auth.currentUser.uid]

  const settingsCollection = values.find(pair => pair[0] === SETTINGS_KEY)
  const settingsDoc = JSON.parse(settingsCollection[1])[auth.currentUser.uid]

  const categoriesCollection = values.find(pair => pair[0] === CATEGORIES_KEY)
  const categoriesDoc = JSON.parse(categoriesCollection[1])[auth.currentUser.uid]

  const statsCollection = values.find(pair => pair[0] === STATS_KEY)
  const statsDoc = JSON.parse(statsCollection[1])[auth.currentUser.uid]

  const focusesCollection = values.find(pair => pair[0] === FOCUSES_KEY)
  const focusesDoc = JSON.parse(focusesCollection[1])
  
  for (const key of Object.keys(focusesDoc)) {
    const focusDoc = focusesDoc[key]  

    focusDoc.active = false
    focusDoc.working = true
    focusDoc.time = 60 * focusDoc.workPeriod
    focusDoc.timer = null
  }

  const userData = {
    [USER_KEY]: userDoc,
    [SETTINGS_KEY]: settingsDoc,
    [CATEGORIES_KEY]: categoriesDoc,
    [STATS_KEY]: statsDoc,
    [FOCUSES_KEY]: focusesDoc,
  }

  return userData
}
