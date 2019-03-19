import { 
  SET_APP_STATE, 
  INC_TRACKED,
  DEC_TRACKED,
  SET_TIME_INACTIVE, 
} from "../constants/Status";

const initialState = {
  appState: 'active',
  tracked: 0,
};

function statusReducer(state = initialState, action) {
  let newState = {...state};

  switch(action.type) {
    case SET_APP_STATE: {
      newState.appState = action.appState;

      return newState;
    }
    case INC_TRACKED: {
      newState.tracked++;

      return newState;
    }
    case DEC_TRACKED: {
      newState.tracked--;

      return newState;
    }
    case SET_TIME_INACTIVE: {
      newState.timeInactive = action.timeInactive;

      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default statusReducer;