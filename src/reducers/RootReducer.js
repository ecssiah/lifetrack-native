import { combineReducers } from 'redux';

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
});

export default RootReducer;