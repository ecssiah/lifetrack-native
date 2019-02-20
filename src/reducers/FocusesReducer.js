import { SET_FOCUSES, ADD_FOCUS } from "../actions/FocusActions";

function focusesReducer(state = [], action) {
  switch (action.type) {
    case ADD_FOCUS:
      return [
        ...state,
        action.focus,
      ];
    case SET_FOCUSES:
      return action.focuses;
    default:
      return state; 
  }
};

export default focusesReducer;