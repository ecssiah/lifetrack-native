import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './AuthReducer';
import focusReducer from './FocusReducer';
import focusesReducer from './FocusesReducer';
import categoriesReducer from './CategoriesReducer';
import settingsReducer from './SettingsReducer';

const RootReducer = combineReducers({
  auth: authReducer,
  focus: focusReducer,
  focuses: focusesReducer,
  categories: categoriesReducer,
  settings: settingsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default RootReducer;