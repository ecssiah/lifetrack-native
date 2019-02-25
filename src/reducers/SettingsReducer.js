import { 
  LOAD_SETTINGS,
  SET_GLOBAL_WORK_PERIOD, SET_GLOBAL_WORK_GOAL, SET_GLOBAL_BREAK_PERIOD,
} from "../actions/SettingsActions";

function settingsReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case LOAD_SETTINGS:
      return action.settings;
    case SET_GLOBAL_WORK_PERIOD:
      newState.workPeriod = action.period;

      return newState;
    case SET_GLOBAL_WORK_GOAL:
      newState.workGoal = action.goal;

      return newState;
    case SET_GLOBAL_BREAK_PERIOD:
      newState.breakPeriod = action.period;

      return newState;
    default:
      return newState;
  }
};

export default settingsReducer;