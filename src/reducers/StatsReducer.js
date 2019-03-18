import { 
  UPDATE_STATS, 
  INITIATE_USER,
  INC_TRACKED,
  DEC_TRACKED,
  SET_UNTRACKED_START,
} from "../constants/Stats";

function statsReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case UPDATE_STATS: {
      return action.stats;
    }
    case INITIATE_USER: {
      newState.newUser = false;

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
    case SET_UNTRACKED_START: {
      newState.untrackedStart = action.timestamp;

      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default statsReducer;