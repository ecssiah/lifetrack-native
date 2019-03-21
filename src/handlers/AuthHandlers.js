import { err } from '../utils';
import { db, auth } from '../config/firebaseConfig';
import { 
  DEFAULT_WORK_PERIOD, DEFAULT_WORK_GOAL, DEFAULT_BREAK_PERIOD 
} from '../constants/Focus';
import { SET_FOCUSES } from '../constants/Focuses';
import { UNCATEGORIZED, SET_CATEGORIES } from '../constants/Categories';
import { SET_SETTINGS } from '../constants/Settings';
import { SET_STATS } from '../constants/Stats';
import { updateStats } from './StatsHandlers';

export async function signUp(dispatch, email, password) {
  return new Promise(async resolve => {
    await auth.createUserWithEmailAndPassword(email, password).catch(err);

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

    await setUserData(settings, categories, stats).catch(err);

    dispatch({ type: SET_SETTINGS, settings });
    dispatch({ type: SET_CATEGORIES, categories });
    dispatch({ type: SET_STATS, stats });
    dispatch({ type: SET_FOCUSES, focuses: {} });

    resolve();
  });
};

export async function signIn(dispatch, email, password) {
  await auth.signInWithEmailAndPassword(email, password).catch(err);

  loadUser(dispatch);
};

export async function signOut(dispatch) {
  let query;
  query = db.collection('focuses');
  query = query.where('userId', '==', auth.currentUser.uid);
  query = query.where('active', '==', true);

  let promises = [];

  const querySnapshot = await query.get().catch(err);

  querySnapshot.forEach(doc => {
    const transactionPromise = db.runTransaction(async transaction => {
      const docSnapshot = transaction.get(doc.ref).catch(err);

      const update = {
        active: false,
        working: true,
        time: docSnapshot.data().workPeriod * 60,
      };

      transaction.update(docSnapshot.ref, update);
    });

    promises.push(transactionPromise);
  });

  await Promise.all(promises).catch(err);
  await updateStats(dispatch, { timeInactive: Date.now() }).catch(err);

  auth.signOut().catch(err);
};

export async function loadUser(dispatch) {
  return new Promise(async resolve => {
    const userData = await loadUserData().catch(err);

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

    resolve();
  });
};

function loadUserData() {
  const settingsPromise = db.collection('settings').doc(
    auth.currentUser.uid
  ).get(); 

  const categoriesPromise = db.collection('categories').doc(
    auth.currentUser.uid
  ).get();

  const statsPromise = db.collection('stats').doc(
    auth.currentUser.uid
  ).get();

  let focusesQuery;
  focusesQuery = db.collection('focuses');
  focusesQuery = focusesQuery.where('userId', '==', auth.currentUser.uid);

  const focusesPromise = focusesQuery.get();

  return Promise.all([
    settingsPromise,
    categoriesPromise,
    statsPromise,
    focusesPromise,
  ]);
};

function setUserData(settings, categories, stats) {
  const settingsPromise = db.collection('settings').doc(
    auth.currentUser.uid
  ).set(settings); 

  const categoriesPromise = db.collection('categories').doc(
    auth.currentUser.uid
  ).set(categories);

  const statsPromise = db.collection('stats').doc(
    auth.currentUser.uid
  ).set(stats);

  return Promise.all([
    settingsPromise,
    categoriesPromise,
    statsPromise,
  ]);
};
