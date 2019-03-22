import { combineReducers } from 'redux';

import statusReducer from './StatusReducer';
import focusReducer from './FocusReducer';
import focusesReducer from './FocusesReducer';
import categoriesReducer from './CategoriesReducer';
import settingsReducer from './SettingsReducer';
import statsReducer from './StatsReducer';
import userReducer from './UserReducer';

const RootReducer = combineReducers({
  status: statusReducer,
  focus: focusReducer,
  focuses: focusesReducer,
  categories: categoriesReducer,
  settings: settingsReducer,
  stats: statsReducer,
  user: userReducer,
});

export default RootReducer;