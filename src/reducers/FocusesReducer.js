import { 
  SET_FOCUSES, ADD_FOCUS, 
  UPDATE_PERIODS, 
  SET_TIME, UPDATE_TIME, 
  UPDATE_EXPERIENCE, 
  RESET_PERIODS,
  SET_WORKING, SET_TIMER_ACTIVE, SET_TIMER
} from "../actions/FocusesActions";

export const SECOND = 1 / 60.0;
export const EXPERIENCE_PER_SECOND = 40 / 60.0;

function focusesReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case SET_FOCUSES:
      return action.focuses;
    case ADD_FOCUS:
      newState[action.focus.id] = action.focus;

      return newState;
    case SET_TIME:
      newState[action.id].time = action.time;

      return newState;
    case UPDATE_TIME:
      newState[action.id].time -= SECOND;

      return newState;
    case UPDATE_PERIODS:
      newState[action.id].periods += 1;

      return newState;
    case RESET_PERIODS:
      newState[action.id].periods = 0;

      return newState;
    case UPDATE_EXPERIENCE:
      newState[action.id].experience += EXPERIENCE_PER_SECOND;

      if (newState[action.id].experience >= 100) {
        newState[action.id].level += 1;
        newState[action.id].experience = 0;
      }

      return newState;
    case SET_WORKING:
      newState[action.id].working = action.working;

      return newState;
    case SET_TIMER_ACTIVE:
      newState[action.id].timerActive = action.timerActive;

      return newState;
    case SET_TIMER:
      newState[action.id].timer = action.timer;

      return newState;
    default:
      return newState; 
  }
};

export default focusesReducer;