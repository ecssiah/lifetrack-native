import { combineReducers } from 'redux';

import alertReducer from './AlertReducer';
import focusReducer from './FocusReducer';
import focusesReducer from './FocusesReducer';
import categoriesReducer from './CategoriesReducer';
import settingsReducer from './SettingsReducer';

const RootReducer = combineReducers({
  alert: alertReducer,
  focus: focusReducer,
  focuses: focusesReducer,
  categories: categoriesReducer,
  settings: settingsReducer,
});

export default RootReducer;