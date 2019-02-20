import { combineReducers } from 'redux';

import focusesReducer from './FocusesReducer';

const RootReducer = combineReducers({
  focuses: focusesReducer,
});

export default RootReducer;