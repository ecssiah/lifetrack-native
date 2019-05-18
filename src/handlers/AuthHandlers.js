import { db, auth } from '../config/firebaseConfig'
import { getDay } from '../../lib/utils';
import { 
  setUserDataLocal, loadUserLocal
} from './DataHandlers'
import { 
  DEFAULT_WORK_PERIOD, DEFAULT_WORK_GOAL, DEFAULT_BREAK_PERIOD
} from '../constants/Settings'
import { UNCATEGORIZED } from '../constants/Categories'
import { SET_CATEGORIES } from '../constants/Categories'
import { SET_SETTINGS } from '../constants/Settings'
import { SET_USER } from '../constants/User'
import { SET_STATS } from '../constants/Stats'
import { SET_FOCUSES } from '../constants/Focuses'


export async function signUp(dispatch, email, password) {
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

  await auth.createUserWithEmailAndPassword(email, password)
  await setUserDataLocal(userData)

  dispatch({ type: SET_USER, user: userData.user })
  dispatch({ type: SET_SETTINGS, settings: userData.settings })
  dispatch({ type: SET_CATEGORIES, categories: userData.categories })
  dispatch({ type: SET_STATS, stats: userData.stats })
  dispatch({ type: SET_FOCUSES, focuses: userData.focuses })
}


export async function signIn(dispatch, email, password) {
  await auth.signInWithEmailAndPassword(email, password)
  loadUserLocal(dispatch)
}


// TODO
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

