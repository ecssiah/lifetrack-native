import { combineReducers } from 'redux';

import focusReducer from './FocusReducer';
import focusesReducer from './FocusesReducer';
import categoriesReducer from './CategoriesReducer';
import settingsReducer from './SettingsReducer';

const RootReducer = combineReducers({
  focus: focusReducer,
  focuses: focusesReducer,
  categories: categoriesReducer,
  settings: settingsReducer,
});

export default RootReducer;