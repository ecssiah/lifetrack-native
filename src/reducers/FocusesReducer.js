import { 
  UPDATE_FOCUSES, 
  ADD_FOCUS, UPDATE_FOCUS, DELETE_FOCUS, 
  UPDATE_FOCUS_TIMER_FIELDS,
  SET_FOCUS_ACTIVE,
  UPDATE_PERIODS, 
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
      clearInterval(newState[action.id].timer);
      delete newState[action.id];

      return newState;
    }
    case SET_FOCUS_ACTIVE: {
      newState[action.id].active = action.active; 

      if (action.active === false) {
        clearInterval(newState[action.id].timer);
      }
      
      return newState;
    }
    default: {
      return newState; 
    }
  }
};

export default focusesReducer;