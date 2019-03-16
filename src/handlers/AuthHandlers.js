import firebase from 'firebase/app';

import { SIGNUP_ERROR, SIGNUP_SUCCESS } from "../constants/Auth";

export function signUpHandler(dispatch, credentials) {
  firebase.createUser(credentials).then(() => {
    dispatch({ type: SIGNUP_SUCCESS });
  }).catch(error => {
    dispatch({ type: SIGNUP_ERROR, error });
  });

  //   const firestore = firebase.firestore();

  //   const settings = {
  //     workPeriod: DEFAULT_WORK_PERIOD,
  //     workGoal: DEFAULT_WORK_GOAL,
  //     breakPeriod: DEFAULT_BREAK_PERIOD,
  //   };

  //   const categories = {
  //     list: [
  //       { name: 'Uncategorized', show: true },
  //     ],
  //   };

  //   const settingsPromise = firestore.set(
  //     `settings/${firebase.auth().currentUser.uid}`, 
  //     settings,
  //   );

  //   const categoriesPromise = firestore.set(
  //     `categories/${firebase.auth().currentUser.uid}`,
  //     categories,
  //   );

  //   Promise.all([
  //     settingsPromise,
  //     categoriesPromise,
  //   ]).then(() => {
  //     NavigationService.navigate('App');
  //     dispatch({ type: SIGNUP_SUCCESS });
  //   }).catch(error => {
  //     console.error(error);
  //   });
};