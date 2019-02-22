import { combineReducers } from 'redux';

import focusesReducer from './FocusesReducer';
import focusIDReducer from './FocusIDReducer';
import settingsReducer from './SettingsReducer';

const RootReducer = combineReducers({
  focuses: focusesReducer,
  focusID: focusIDReducer,
  settings: settingsReducer,
});

export default RootReducer;