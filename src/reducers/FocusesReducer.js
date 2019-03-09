import { 
  SET_FOCUSES, ADD_FOCUS, DELETE_FOCUS, 
  SET_NAME, SET_CATEGORY, SET_TIME, SET_WORKING, SET_ACTIVE, SET_TIMER, 
  SET_WORK_PERIOD, SET_WORK_GOAL, SET_BREAK_PERIOD,
  UPDATE_TIME, UPDATE_PERIODS, UPDATE_EXPERIENCE, RESET_PERIODS, UPDATE_CATEGORIES, LOAD_FOCUSES_SUCCESS, LOAD_FOCUSES_FAIL,
} from "../constants/Focuses";

export const SECOND = 1 / 60.0;
export const EXPERIENCE_PER_SECOND = 40 / 60.0;

function focusesReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case SET_FOCUSES: {
      return action.focuses;
    }
    case LOAD_FOCUSES_SUCCESS: {
      return action.focuses;
    }
    case LOAD_FOCUSES_FAIL: {
      console.warn(action.error);

      return newState;
    }
    case ADD_FOCUS: {
      newState[action.focus.id] = action.focus;

      return newState;
    }
    case DELETE_FOCUS: {
      clearInterval(newState[action.id].timer);
      delete newState[action.id];

      return newState;
    }
    case SET_NAME: {
      newState[action.id].name = action.name;

      return newState;
    }
    case SET_CATEGORY: {
      newState[action.id].category = action.category;
      
      return newState;
    }
    case SET_TIME: {
      newState[action.id].time = action.time;

      return newState;
    }
    case SET_WORKING: {
      newState[action.id].working = action.working;

      return newState;
    }
    case SET_ACTIVE: {
      newState[action.id].active = action.active;

      return newState;
    }
    case SET_TIMER: {
      newState[action.id].timer = action.timer;

      return newState;
    }
    case SET_WORK_PERIOD: {
      newState[action.id].workPeriod = action.period;

      if (newState[action.id].working) {
        newState[action.id].time = action.period;
      }

      return newState;
    }
    case SET_WORK_GOAL: {
      newState[action.id].workGoal = action.goal;

      return newState;
    }
    case SET_BREAK_PERIOD: {
      newState[action.id].breakPeriod = action.period;

      return newState;
    }
    case UPDATE_TIME: {
      newState[action.id].time -= SECOND;

      return newState;
    }
    case UPDATE_PERIODS: {
      newState[action.id].periods += 1;

      return newState;
    }
    case UPDATE_EXPERIENCE: {
      newState[action.id].experience += EXPERIENCE_PER_SECOND;

      if (newState[action.id].experience >= 100) {
        newState[action.id].level += 1;
        newState[action.id].experience = 0;
      }

      return newState;
    }
    case RESET_PERIODS: {
      newState[action.id].periods = 0;

      return newState;
    }
    case UPDATE_CATEGORIES: {
      for (const key in newState) {
        if (newState[key].category === action.name) {
          newState[key].category = action.newName;
        }
      }

      return newState;
    }
    default: {
      return newState; 
    }
  }
};

export default focusesReducer;