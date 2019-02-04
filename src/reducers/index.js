import { combineReducers } from 'redux';

const reducer1 = (state = [], action) => {
  return state;
}

const reducer2 = (state = [], action) => {
  return state;
}

export default combineReducers({
  reducer1,
  reducer2,
});