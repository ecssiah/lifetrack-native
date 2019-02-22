import { 
  SET_FOCUSES, ADD_FOCUS, UPDATE_FOCUS, 
  UPDATE_PERIODS, 
  SET_TIME, UPDATE_TIME, 
  UPDATE_EXPERIENCE 
} from "../actions/FocusesActions";
import { SECOND, EXPERIENCE_PER_SECOND } from "./FocusIDReducer";

function focusesReducer(state = [], action) {
  let newState;
  let targetFocus;

  switch (action.type) {
    case ADD_FOCUS:
      return [
        ...state,
        action.focus,
      ];
    case UPDATE_FOCUS:
      newState = state.filter(focus => focus.id !== action.focus.id);
      newState.push(action.focus);

      return newState;
    case SET_FOCUSES:
      return action.focuses;
    case SET_TIME:
      newState = state.filter(focus => focus.id !== action.id);
      targetFocus = state.find(focus => focus.id === action.id);

      newState = [
        ...newState,
        {
          ...targetFocus,
          time: action.time,
        },
      ];

      return newState;
    case UPDATE_TIME:
      newState = state.filter(focus => focus.id !== action.id);
      targetFocus = state.find(focus => focus.id === action.id);

      newState = [
        ...newState,
        {
          ...targetFocus,
          time: targetFocus.time - SECOND,
        },
      ];

      return newState;
    case UPDATE_PERIODS:
      newState = state.filter(focus => focus.id !== action.id);
      targetFocus = state.find(focus => focus.id === action.id);

      newState = [
        ...newState,
        {
          ...targetFocus,
          periods: targetFocus.periods + 1,
        },
      ];

      return newState;
    case UPDATE_EXPERIENCE:
      newState = state.filter(focus => focus.id !== action.id);
      targetFocus = state.find(focus => focus.id === action.id);

      let level = targetFocus.level;
      let experience = targetFocus.experience + EXPERIENCE_PER_SECOND;

      if (experience >= 100) {
        experience = 0;
        level += 1;
      }

      newState = [
        ...newState,
        {
          ...targetFocus,
          experience,
          level,
        },
      ];

      return newState;
    default:
      return state; 
  }
};

export default focusesReducer;