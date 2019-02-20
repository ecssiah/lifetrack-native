import { combineReducers } from 'redux';

import selectionReducer from './SelectionReducer';
import focusesReducer from './FocusesReducer';

const RootReducer = combineReducers({
  selection: selectionReducer,
  focuses: focusesReducer,
});

export default RootReducer;