import { db, auth } from '../config/firebaseConfig'
import { getToday } from '../../lib/utils';
import { 
  DEFAULT_WORK_PERIOD, DEFAULT_WORK_GOAL, DEFAULT_BREAK_PERIOD 
} from '../constants/Selection'
import { updateFocuses } from './FocusesHandlers'
import { SET_CATEGORIES, UNCATEGORIZED } from '../constants/Categories'
import { SET_SETTINGS } from '../constants/Settings'
import { SET_USER } from '../constants/User'

export async function signUp(dispatch, email, password) {
  await auth.createUserWithEmailAndPassword(email, password)

  const userData = {
    user: {
      email,
      startDate: getToday(),
    },
    settings: {
      workPeriod: DEFAULT_WORK_PERIOD,
      workGoal: DEFAULT_WORK_GOAL,
      breakPeriod: DEFAULT_BREAK_PERIOD,
    },
    categories: {
      [UNCATEGORIZED]: { show: true },
    },
  }

  await setUserData(userData)

  dispatch({ type: SET_USER, user: userData.user })
  dispatch({ type: SET_SETTINGS, settings: userData.settings })
  dispatch({ type: SET_CATEGORIES, categories: userData.categories })
}

export async function signIn(dispatch, email, password) {
  await auth.signInWithEmailAndPassword(email, password)
  await loadUser(dispatch)
}

export async function signOut(dispatch) {
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
  await auth.signOut()
}

export async function loadUser(dispatch) {
  const userData = await loadUserData()

  const user = userData[0].data()
  const settings = userData[1].data()
  const categories = userData[2].data()

  dispatch({ type: SET_USER, user })
  dispatch({ type: SET_SETTINGS, settings })
  dispatch({ type: SET_CATEGORIES, categories })

  const focuses = {} 

  userData[3].forEach(doc => {
    const focus = { ...doc.data() }

    focus.active = false
    focus.working = true
    focus.time = 60 * settings.workPeriod
    focus.timer = null

    focuses[doc.id] = focus
  })

  updateFocuses(dispatch, focuses)
}

async function loadUserData() {
  const userDoc = db.collection('user').doc(auth.currentUser.uid)
  const settingsDoc = db.collection('settings').doc(auth.currentUser.uid)
  const categoriesDoc = db.collection('categories').doc(auth.currentUser.uid)

  let focusesQuery = db.collection('focuses')
  focusesQuery = focusesQuery.where('userId', '==', auth.currentUser.uid)

  return Promise.all([
    userDoc.get(),
    settingsDoc.get(),
    categoriesDoc.get(),
    focusesQuery.get()
  ])
}

async function setUserData(userData) {
  const userDoc = db.collection('user').doc(auth.currentUser.uid)
  const settingsDoc = db.collection('settings').doc(auth.currentUser.uid) 
  const categoriesDoc = db.collection('categories').doc(auth.currentUser.uid)

  return Promise.all([
    userDoc.set(userData.user),
    settingsDoc.set(userData.settings),
    categoriesDoc.set(userData.categories),
  ])
}
