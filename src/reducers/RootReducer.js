import { combineReducers } from 'redux';

import statusReducer from './StatusReducer';
import selectionReducer from './SelectionReducer';
import focusesReducer from './FocusesReducer';
import categoriesReducer from './CategoriesReducer';
import settingsReducer from './SettingsReducer';
import statsReducer from './StatsReducer';
import userReducer from './UserReducer';

const RootReducer = combineReducers({
  status: statusReducer,
  selection: selectionReducer,
  focuses: focusesReducer,
  categories: categoriesReducer,
  settings: settingsReducer,
  stats: statsReducer,
  user: userReducer,
});

export default RootReducer;