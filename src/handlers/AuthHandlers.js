import { db, auth } from '../config/firebaseConfig';
import { err } from '../utils';
import { 
  DEFAULT_WORK_PERIOD, DEFAULT_WORK_GOAL, DEFAULT_BREAK_PERIOD 
} from '../constants/Focus';
import { SET_FOCUSES } from '../constants/Focuses';
import { SET_CATEGORIES, UNCATEGORIZED } from '../constants/Categories';
import { SET_SETTINGS } from '../constants/Settings';
import { SET_STATS } from '../constants/Stats';
import { SET_USER } from '../constants/User';
import { updateStats } from './StatsHandlers';

export async function signUp(dispatch, email, password) {
  const executor = async (resolve, reject) => {
    await auth.createUserWithEmailAndPassword(email, password).catch(error => {
      reject(error);
    });

    const userData = {
      user: {
        newUser: true,
        email,
      },
      settings: {
        workPeriod: DEFAULT_WORK_PERIOD,
        workGoal: DEFAULT_WORK_GOAL,
        breakPeriod: DEFAULT_BREAK_PERIOD,
      },
      categories: {
        [UNCATEGORIZED]: { show: true },
      },
      stats: {
        inactiveStart: null,
        untracked: 0,
      },
      focuses: { },
    };

    await setUserData(userData).catch(error => {
      reject({ userData, error });
    });

    dispatch({ type: SET_USER, user: userData.user });
    dispatch({ type: SET_SETTINGS, settings: userData.settings });
    dispatch({ type: SET_CATEGORIES, categories: userData.categories });
    dispatch({ type: SET_STATS, stats: userData.stats });
    dispatch({ type: SET_FOCUSES, focuses: userData.focuses });

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
    await updateStats(dispatch, { inactiveStart: Date.now() }).catch(error => {
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

    const user = userData[0].data();
    const settings = userData[1].data();
    const categories = userData[2].data();
    const stats = userData[3].data();

    let focuses = {};
    const focusesSnapshot = userData[4];
    focusesSnapshot.forEach(doc => focuses[doc.id] = doc.data());

    dispatch({ type: SET_USER, user });
    dispatch({ type: SET_SETTINGS, settings });
    dispatch({ type: SET_CATEGORIES, categories });
    dispatch({ type: SET_STATS, stats });
    dispatch({ type: SET_FOCUSES, focuses });

    resolve({ user, settings, categories, stats, focuses });
  };

  return new Promise(executor);
};

async function loadUserData() {
  const userDoc = db.collection('user').doc(auth.currentUser.uid);
  const settingsDoc = db.collection('settings').doc(auth.currentUser.uid);
  const categoriesDoc = db.collection('categories').doc(auth.currentUser.uid);
  const statsDoc = db.collection('stats').doc(auth.currentUser.uid);

  let focusesQuery;
  focusesQuery = db.collection('focuses');
  focusesQuery = focusesQuery.where('userId', '==', auth.currentUser.uid);

  try {
    return Promise.all([
      userDoc.get(),
      settingsDoc.get(),
      categoriesDoc.get(),
      statsDoc.get(),
      focusesQuery.get()
    ]);
  }
  catch (error) {
    return err(error);
  }
};

async function setUserData(userData) {
  const userDoc = db.collection('user').doc(auth.currentUser.uid);
  const settingsDoc = db.collection('settings').doc(auth.currentUser.uid); 
  const categoriesDoc = db.collection('categories').doc(auth.currentUser.uid);
  const statsDoc = db.collection('stats').doc(auth.currentUser.uid);
  const focusesDoc = db.collection('focuses').doc(auth.currentUser.uid);

  try {
    return Promise.all([
      userDoc.set(userData.user),
      settingsDoc.set(userData.settings),
      categoriesDoc.set(userData.categories),
      statsDoc.set(userData.stats),
      focusesDoc.set(userData.focuses)
    ]);
  }
  catch (error) {
    return err(error);
  }
};
