import { db, auth } from '../config/firebaseConfig';
import { 
  DEFAULT_WORK_PERIOD, DEFAULT_WORK_GOAL, DEFAULT_BREAK_PERIOD 
} from '../constants/Focus';
import { SET_FOCUSES } from '../constants/Focuses';
import { UNCATEGORIZED, SET_CATEGORIES } from '../constants/Categories';
import { SET_SETTINGS } from '../constants/Settings';
import { SET_STATS } from '../constants/Stats';
import { updateStats } from './StatsHandlers';
import { err } from '../utils';

export async function signUp(dispatch, email, password) {
  const executor = async (resolve, reject) => {
    await auth.createUserWithEmailAndPassword(email, password).catch(error => {
      reject(error);
    });

    const settings = {
      workPeriod: DEFAULT_WORK_PERIOD,
      workGoal: DEFAULT_WORK_GOAL,
      breakPeriod: DEFAULT_BREAK_PERIOD,
    };

    const categories = {
      [UNCATEGORIZED]: { show: true },
    };

    const stats = {
      newUser: true,
      appState: 'active',
      timeInactive: null,
      untracked: 0,
    };

    const focuses = {};

    await setUserData(settings, categories, stats, focuses).catch(error => {
      reject({ settings, categories, stats, focuses, error });
    });

    dispatch({ type: SET_SETTINGS, settings });
    dispatch({ type: SET_CATEGORIES, categories });
    dispatch({ type: SET_STATS, stats });
    dispatch({ type: SET_FOCUSES, focuses });

    resolve();
  }

  return new Promise(executor);
};

export async function signIn(dispatch, email, password) {
  const executor = async (resolve, reject) => {
    await auth.signInWithEmailAndPassword(email, password).catch(error => {
      reject(error);
    });

    await loadUser(dispatch).catch(error => reject(error));

    resolve();
  };

  return new Promise(executor);
};

export async function signOut(dispatch) {
  const executor = async (resolve, reject) => {
    let query;
    query = db.collection('focuses');
    query = query.where('userId', '==', auth.currentUser.uid);
    query = query.where('active', '==', true);

    let promises = [];

    const querySnapshot = await query.get().catch(error => {
      reject({ query, error });
    });

    querySnapshot.forEach(doc => {
      const transactionUpdateFunc = async transaction => {
        const docSnapshot = await transaction.get(doc.ref).catch(error => {
          reject(error);
        });

        const update = {
          active: false,
          working: true,
          time: docSnapshot.data().workPeriod * 60,
        };

        transaction.update(doc.ref, update);
      };

      promises.push(db.runTransaction(transactionUpdateFunc));
    });

    await Promise.all(promises).catch(error => reject(error));
    await updateStats(dispatch, { timeInactive: Date.now() }).catch(error => {
      reject(error);
    });
    await auth.signOut().catch(error => reject(error));

    resolve();
  };

  return new Promise(executor);
};

export async function loadUser(dispatch) {
  const executor = async (resolve, reject) => {
    const userData = await loadUserData().catch(error => reject(error));

    const settings = userData[0].data();
    const categories = userData[1].data();
    const stats = userData[2].data();
    const focusesSnapshot = userData[3];

    let focuses = {};
    focusesSnapshot.forEach(doc => focuses[doc.id] = doc.data());

    dispatch({ type: SET_SETTINGS, settings });
    dispatch({ type: SET_CATEGORIES, categories });
    dispatch({ type: SET_STATS, stats });
    dispatch({ type: SET_FOCUSES, focuses });

    resolve({ settings, categories, stats, focuses });
  };

  return new Promise(executor);
};

function loadUserData() {
  const settingsDoc = db.collection('settings').doc(auth.currentUser.uid);
  const categoriesDoc = db.collection('categories').doc(auth.currentUser.uid);
  const statsDoc = db.collection('stats').doc(auth.currentUser.uid);

  let focusesQuery;
  focusesQuery = db.collection('focuses');
  focusesQuery = focusesQuery.where('userId', '==', auth.currentUser.uid);

  try {
    return Promise.all([
      settingsDoc.get(),
      categoriesDoc.get(),
      statsDoc.get(),
      focusesQuery.get()
    ]);
  } catch (error) {
    err(error);    
  }
};

function setUserData(settings, categories, stats, focuses) {
  const settingsDoc = db.collection('settings').doc(auth.currentUser.uid); 
  const categoriesDoc = db.collection('categories').doc(auth.currentUser.uid);
  const statsDoc = db.collection('stats').doc(auth.currentUser.uid);
  const focusesDoc = db.collection('focuses').doc(auth.currentUser.uid);

  try {
    return Promise.all([
      settingsDoc.set(settings),
      categoriesDoc.set(categories),
      statsDoc.set(stats),
      focusesDoc.set(focuses)
    ]);
  }
  catch (error) {
    err(error);
  }
};
