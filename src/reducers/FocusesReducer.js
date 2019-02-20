import { SET_FOCUSES, ADD_FOCUS, UPDATE_FOCUS } from "../actions/FocusesActions";

function focusesReducer(state = [], action) {
  switch (action.type) {
    case ADD_FOCUS:
      return [
        ...state,
        action.focus,
      ];
    case UPDATE_FOCUS:
      let newState = state.filter(focus => focus.id !== action.focus.id);
      newState.push(action.focus);

      return newState;
    case SET_FOCUSES:
      return action.focuses;
    default:
      return state; 
  }
};

export default focusesReducer;