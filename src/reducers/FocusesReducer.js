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
      Object.assign(newState[action.id], action.updateFields);

      return newState;
    }
    case DELETE_FOCUS: {
      delete newState[action.id];

      return newState;
    }
    default: {
      return newState; 
    }
  }
};

export default focusesReducer;