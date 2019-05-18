import { auth } from '../config/firebaseConfig'
import { getDay } from '../../lib/utils';
import { 
  setUserDataLocal, loadUserLocal, setUserData
} from './DataHandlers'
import { 
  DEFAULT_WORK_PERIOD, DEFAULT_WORK_GOAL, DEFAULT_BREAK_PERIOD, SETTINGS_KEY
} from '../constants/Settings'
import { UNCATEGORIZED, CATEGORIES_KEY } from '../constants/Categories'
import { USER_KEY } from '../constants/User';
import { STATS_KEY } from '../constants/Stats';
import { FOCUSES_KEY } from '../constants/Focuses';
import { UPDATE_STATUS } from '../constants/Status';


export async function signUp(dispatch, email, password) {
  dispatch({ type: UPDATE_STATUS, update: { userLoading: true } })

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

  await auth.createUserWithEmailAndPassword(email, password)
  await setUserDataLocal(userData)
  await setUserData(dispatch, userData)

  dispatch({ type: UPDATE_STATUS, update: { userLoading: false } })
}


export async function signIn(dispatch, email, password) {
  await auth.signInWithEmailAndPassword(email, password)
  loadUserLocal(dispatch)
}


// TODO
export async function signOut() {
  // let query = db.collection('focuses')
  // query = query.where('userId', '==', auth.currentUser.uid)
  // query = query.where('active', '==', true)

  // const promises = []
  // const querySnapshot = await query.get()

  // querySnapshot.forEach(doc => {
  //   const transactionUpdateFunc = async transaction => {
  //     const docSnapshot = await transaction.get(doc.ref)

  //     const update = {
  //       active: false,
  //       working: true,
  //       time: docSnapshot.data().workPeriod * 60,
  //     }

  //     transaction.update(doc.ref, update)
  //   }

  //   promises.push(db.runTransaction(transactionUpdateFunc))
  // })

  // await Promise.all(promises)
  // auth.signOut()
}

