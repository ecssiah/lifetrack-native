import { db, auth } from '../config/fbConfig';
import NavigationService from '../services/NavigationService';
import { 
  DEFAULT_WORK_PERIOD, 
  DEFAULT_WORK_GOAL, 
  DEFAULT_BREAK_PERIOD 
} from '../constants/Focus';
import { UPDATE_FOCUSES } from '../constants/Focuses';
import { UPDATE_CATEGORIES, UNCATEGORIZED } from '../constants/Categories';
import { UPDATE_SETTINGS } from '../constants/Settings';
import { UPDATE_STATS, SET_UNTRACKED_START } from '../constants/Stats';

export function loadUserData() {
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

export function createUserData(settings, categories, stats) {
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

export function loadUser(dispatch) {
  loadUserData().then(values => {
    const settings = values[0].data();
    const categories = values[1].data();
    const stats = values[2].data();

    const focusesSnapshot = values[3];

    let focuses = {};
    focusesSnapshot.forEach(doc => focuses[doc.id] = doc.data());

    dispatch({ type: UPDATE_SETTINGS, settings });
    dispatch({ type: UPDATE_CATEGORIES, categories });
    dispatch({ type: UPDATE_STATS, stats });
    dispatch({ type: UPDATE_FOCUSES, focuses });

    NavigationService.navigate('App');
  }).catch(error => {
    console.error(error);
  });
};

export function signUp(dispatch, email, password) {
  auth.createUserWithEmailAndPassword(email, password).then(() => {
    const settings = {
      workPeriod: DEFAULT_WORK_PERIOD,
      workGoal: DEFAULT_WORK_GOAL,
      breakPeriod: DEFAULT_BREAK_PERIOD,
    };

    const categories = {
      [UNCATEGORIZED]: { show: true },
    };

    const stats = {
      untracked: 0,
    };

    createUserData(settings, categories, stats).then(() => {
      dispatch({ type: UPDATE_SETTINGS, settings });
      dispatch({ type: UPDATE_CATEGORIES, categories });
      dispatch({ type: UPDATE_STATS, stats });

      NavigationService.navigate('App');
    }).catch(error => {
      console.error(error);
    });
  }).catch(error => {
    console.error(error);
  });
};

export function signIn(dispatch, email, password) {
  auth.signInWithEmailAndPassword(email, password).then(() => {
    loadUserData().then(values => {
      const settings = values[0].data();
      const categories = values[1].data();
      const stats = values[2].data();

      const focusesSnapshot = values[3];

      let focuses = {};
      focusesSnapshot.forEach(doc => focuses[doc.id] = doc.data());

      dispatch({ type: UPDATE_SETTINGS, settings });
      dispatch({ type: UPDATE_CATEGORIES, categories });
      dispatch({ type: UPDATE_STATS, stats });

      dispatch({ type: UPDATE_FOCUSES, focuses });

      NavigationService.navigate('App');
    }).catch(error => {
      console.error(error);
    });
  }).catch(error => {
    console.error(error);
  });
};

export function signOut(dispatch) {
  let query;
  query = db.collection('focuses');
  query = query.where('userId', '==', auth.currentUser.uid);
  query = query.where('active', '==', true);

  query.get().then(snapshot => {
    let batch = db.batch();

    snapshot.forEach(doc => {
      const focusRef = db.collection('focuses').doc(doc.id);

      batch.update(
        focusRef, 
        { 
          active: false, 
          working: true,
          time: doc.get('workPeriod') * 60,
        }
      );
    });

    batch.commit().then(() => {
      dispatch({ type: SET_UNTRACKED_START, timestamp: Date.now() });

      auth.signOut().catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });
  });
};