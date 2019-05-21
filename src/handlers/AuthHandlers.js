import { auth, admin } from '../config/firebaseConfig'
import { getDay } from '../../lib/utils';
import { saveUserLocal, loadUserLocal } from './DataHandlers'
import { resetFocuses } from './FocusesHandlers';
import AsyncStorage from '@react-native-community/async-storage';
import { UNCATEGORIZED, CATEGORIES_KEY } from '../constants/Categories'
import { USER_KEY } from '../constants/User';
import { STATS_KEY } from '../constants/Stats';
import { FOCUSES_KEY } from '../constants/Focuses';
import { 
  DEFAULT_WORK_PERIOD, 
  DEFAULT_WORK_GOAL, 
  DEFAULT_BREAK_PERIOD, 
  SETTINGS_KEY
} from '../constants/Settings'


export async function signUp(dispatch, email, password) {
  const startDate = getDay(0).getTime()
  const endDate = getDay(6).getTime()

  const userData = {
    [USER_KEY]: {
      email,
      startDate,
      nextChartColor: 0,
    },
    [SETTINGS_KEY]: {
      workPeriod: DEFAULT_WORK_PERIOD,
      workGoal: DEFAULT_WORK_GOAL,
      breakPeriod: DEFAULT_BREAK_PERIOD,
    },
    [CATEGORIES_KEY]: {
      [UNCATEGORIZED]: { 
        focusVisible: true, 
        statVisible: true,
      },
    },
    [STATS_KEY]: {
      startDate,
      endDate,
    },
    [FOCUSES_KEY]: {},
  }

  await admin.createUserWithEmailAndPassword(email, password)
  await saveUserLocal(dispatch, admin.currentUser.uid, userData)
  admin.signOut()

  auth.signInWithEmailAndPassword(email, password)
}


export async function signIn(dispatch, email, password) {
  await auth.signInWithEmailAndPassword(email, password)
  await loadUserLocal(dispatch)
}


export async function signOut(dispatch) {
  const focusesCollectionRaw = await AsyncStorage.getItem(FOCUSES_KEY)
  const focusesCollection = JSON.parse(focusesCollectionRaw)

  const userFocusesCollection = {}
  for (let [id, focus] of Object.entries(focusesCollection)) {
    if (focus.userId === auth.currentUser.uid) {
      userFocusesCollection[id] = focus
    }
  }

  await resetFocuses(dispatch, userFocusesCollection)
  await auth.signOut()
}

