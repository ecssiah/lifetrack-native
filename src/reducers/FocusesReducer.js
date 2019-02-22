import { 
  SET_FOCUSES, ADD_FOCUS, 
  UPDATE_PERIODS, 
  SET_TIME, UPDATE_TIME, 
  UPDATE_EXPERIENCE, 
  RESET_PERIODS
} from "../actions/FocusesActions";
import { SECOND, EXPERIENCE_PER_SECOND } from "./FocusIDReducer";

function focusesReducer(state = {}, action) {
  let newState;
  let targetFocus;

  switch (action.type) {
    case ADD_FOCUS:
      newState = Object.assign({}, state);
      newState[action.id] = action.focus;

      return newState;
    case SET_FOCUSES:
      return action.focuses;
    case SET_TIME:
      newState = Object.assign({}, state);
      newState[action.id].time = action.time;

      return newState;
    case UPDATE_TIME:
      newState = Object.assign({}, state);
      newState[action.id].time -= SECOND;

      return newState;
    case UPDATE_PERIODS:
      newState = Object.assign({}, state);
      newState[action.id].periods += 1;

      return newState;
    case RESET_PERIODS:
      newState = Object.assign({}, state);
      newState[action.id].periods = 0;

      return newState;
    case UPDATE_EXPERIENCE:
      newState = Object.assign({}, state);

      let level = newState[action.id].level;
      let experience = newState[action.id].experience + EXPERIENCE_PER_SECOND;

      if (experience >= 100) {
        level += 1;
        experience = 0;
      }

      newState[action.id].level = level;
      newState[action.id].experience = experience;

      return newState;
    default:
      return state; 
  }
};

export default focusesReducer;