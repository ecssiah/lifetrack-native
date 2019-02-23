import { combineReducers } from 'redux';

import focusesReducer from './FocusesReducer';
import focusReducer from './FocusReducer';
import settingsReducer from './SettingsReducer';

const RootReducer = combineReducers({
  focuses: focusesReducer,
  focusId: focusReducer,
  settings: settingsReducer,
});

export default RootReducer;