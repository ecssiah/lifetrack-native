import { SET_FOCUSES } from "../actions/FocusActions";

function focusesReducer(state = [], action) {
  switch (action.type) {
    case SET_FOCUSES:
      return action.focuses;
    default:
      return state; 
  }
};

export default focusesReducer;