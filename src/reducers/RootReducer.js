import { combineReducers } from 'redux';

import focusReducer from './FocusReducer';
import focusesReducer from './FocusesReducer';
import settingsReducer from './SettingsReducer';

const RootReducer = combineReducers({
  focus: focusReducer,
  focuses: focusesReducer,
  settings: settingsReducer,
});

export default RootReducer;