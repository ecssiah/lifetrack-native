import { 
  UPDATE_FOCUSES, 
  ADD_FOCUS, UPDATE_FOCUS, DELETE_FOCUS, 
} from "../constants/Focuses";

function focusesReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case UPDATE_FOCUSES: {
      return action.focuses;
    }
    case ADD_FOCUS: {
      newState[action.id] = action.focus;

      return newState;
    }
    case UPDATE_FOCUS: {
      newState[action.id] = action.focus;

      return newState;
    }
    case DELETE_FOCUS: {
      clearInterval(newState[action.id].timer);
      delete newState[action.id];

      return newState;
    }
    default: {
      return newState; 
    }
  }
};

export default focusesReducer;