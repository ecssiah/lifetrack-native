import { 
  SIGNUP_ERROR, SIGNUP_SUCCESS,
  SIGNIN_SUCCESS, SIGNIN_ERROR, 
  SIGNOUT_SUCCESS, SIGNOUT_ERROR, 
} from "../constants/Auth";
import { 
  DEFAULT_WORK_PERIOD, 
  DEFAULT_WORK_GOAL, 
  DEFAULT_BREAK_PERIOD 
} from "../constants/Focus";
import NavigationService from "../services/NavigationService";

export function signUp(credentials) {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    firebase.createUser(credentials).then(cred => {
      const firestore = getFirestore();

      const settings = {
        workPeriod: DEFAULT_WORK_PERIOD,
        workGoal: DEFAULT_WORK_GOAL,
        breakPeriod: DEFAULT_BREAK_PERIOD,
      };

      const categories = {
        list: [
          { name: 'Uncategorized', show: true },
        ],
      };

      const settingsPromise = firestore.set(
        `settings/${firebase.auth().currentUser.uid}`, 
        settings,
      );

      const categoriesPromise = firestore.set(
        `categories/${firebase.auth().currentUser.uid}`,
        categories,
      );

      Promise.all([
        settingsPromise,
        categoriesPromise,
      ]).then(() => {
        NavigationService.navigate('App');
        dispatch({ type: SIGNUP_SUCCESS });
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      dispatch({ type: SIGNUP_ERROR, error });
    });
  }
};

export function signIn(credentials) {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    
    firebase.login(credentials).then(() => {
      dispatch({ type: SIGNIN_SUCCESS });
    }).catch(error => {
      dispatch({ type: SIGNIN_ERROR, error });
    });
  };
};

export function signOut() {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.logout().then(() => {
      dispatch({ type: SIGNOUT_SUCCESS });
    }).catch(error => {
      dispatch({ type: SIGNOUT_ERROR, error });
    });
  }
};
