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

export function loadUserData() {
  const settingsPromise = db.collection('settings').doc(
    auth.currentUser.uid
  ).get(); 

  const categoriesPromise = db.collection('categories').doc(
    auth.currentUser.uid
  ).get();

  let focusesQuery;
  focusesQuery = db.collection('focuses');
  focusesQuery = focusesQuery.where('userId', '==', auth.currentUser.uid);

  const focusesPromise = focusesQuery.get();

  return Promise.all([
    settingsPromise,
    categoriesPromise,
    focusesPromise,
  ]);
};

export function createUserData(settings, categories) {
  const settingsPromise = db.collection('settings').doc(
    auth.currentUser.uid
  ).set(settings); 

  const categoriesPromise = db.collection('categories').doc(
    auth.currentUser.uid
  ).set(categories);

  return Promise.all([
    settingsPromise,
    categoriesPromise,
  ]);
};

export function loadUserHandler(dispatch) {
  loadUserData().then(values => {
    const settings = values[0].data();
    const categories = values[1].data().list;

    const focusesSnapshot = values[2];

    let focuses = {};
    focusesSnapshot.forEach(doc => focuses[doc.id] = doc.data());

    dispatch({ type: UPDATE_SETTINGS, settings });
    dispatch({ type: UPDATE_CATEGORIES, categories });
    dispatch({ type: UPDATE_FOCUSES, focuses });

    NavigationService.navigate('App');
  }).catch(error => {
    console.error(error);
  });
};

export function signUpHandler(dispatch, email, password) {
  auth.createUserWithEmailAndPassword(email, password).then(() => {
    const settings = {
      workPeriod: DEFAULT_WORK_PERIOD,
      workGoal: DEFAULT_WORK_GOAL,
      breakPeriod: DEFAULT_BREAK_PERIOD,
    };

    const categories = {
      list: [
        { name: UNCATEGORIZED, show: true },
      ],
    };

    createUserData(settings, categories).then(() => {
      dispatch({ type: UPDATE_SETTINGS, settings });
      dispatch({ type: UPDATE_CATEGORIES, categories: categories.list });

      NavigationService.navigate('App');
    }).catch(error => {
      console.error(error);
    });
  }).catch(error => {
    console.error(error);
  });
};

export function signInHandler(dispatch, email, password) {
  auth.signInWithEmailAndPassword(email, password).then(() => {
    loadUserData().then(values => {
      const settings = values[0].data();
      const categories = values[1].data().list;

      const focusesSnapshot = values[2];

      let focuses = {};
      focusesSnapshot.forEach(doc => focuses[doc.id] = doc.data());

      dispatch({ type: UPDATE_SETTINGS, settings });
      dispatch({ type: UPDATE_CATEGORIES, categories });
      dispatch({ type: UPDATE_FOCUSES, focuses });

      NavigationService.navigate('App');
    }).catch(error => {
      console.error(error);
    });
  }).catch(error => {
    console.error(error);
  });
}

export function signOutHandler(dispatch) {
  auth.logout().then(() => {
    NavigationService.navigate('Auth');
  }).catch(error => {
    console.error(error);
  });
}