import { combineReducers } from 'redux';

import statusReducer from './StatusReducer';
import focusReducer from './FocusReducer';
import focusesReducer from './FocusesReducer';
import categoriesReducer from './CategoriesReducer';
import settingsReducer from './SettingsReducer';

const RootReducer = combineReducers({
  status: statusReducer,
  focus: focusReducer,
  focuses: focusesReducer,
  categories: categoriesReducer,
  settings: settingsReducer,
});

export default RootReducer;