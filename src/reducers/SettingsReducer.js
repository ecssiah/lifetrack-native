import { 
  SET_SETTINGS,
  SET_DEFAULT_WORK_PERIOD, SET_DEFAULT_WORK_GOAL, SET_DEFAULT_BREAK_PERIOD,
} from "../constants/Settings";

function settingsReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case SET_SETTINGS: {
      return action.settings;
    }
    case SET_DEFAULT_WORK_PERIOD: {
      newState.workPeriod = action.period;

      return newState;
    }
    case SET_DEFAULT_WORK_GOAL: {
      newState.workGoal = action.goal;

      return newState;
    }
    case SET_DEFAULT_BREAK_PERIOD: {
      newState.breakPeriod = action.period;

      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default settingsReducer;