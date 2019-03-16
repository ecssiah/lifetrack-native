import { db, auth } from '../config/fbConfig';
import NavigationService from '../services/NavigationService';
import { SIGNUP_ERROR, SIGNUP_SUCCESS } from "../constants/Auth";
import { 
  DEFAULT_WORK_PERIOD, 
  DEFAULT_WORK_GOAL, 
  DEFAULT_BREAK_PERIOD 
} from '../constants/Focus';

export function signUpHandler(dispatch, email, password) {
  auth.createUserWithEmailAndPassword(email, password).then(() => {
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

    const settingsPromise = db.collection('settings').doc(
      auth.currentUser.uid
    ).set(settings); 

    const categoriesPromise = db.collection('categories').doc(
      auth.currentUser.uid
    ).set(categories);

    Promise.all([
      settingsPromise,
      categoriesPromise,
    ]).then(() => {
      NavigationService.navigate('App');

      dispatch({ type: SIGNUP_SUCCESS });
    }).catch(error => {
      dispatch({ type: SIGNUP_ERROR, error });
    });
  }).catch(error => {
    dispatch({ type: SIGNUP_ERROR, error });
  });
};