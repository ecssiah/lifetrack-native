import { 
  UPDATE_STATS, 
  UPDATE_UNTRACKED,
} from "../constants/Stats";

function statsReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case UPDATE_STATS: {
      return action.stats;
    }
    case UPDATE_UNTRACKED: {
      newState.untracked += 1; 

      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default statsReducer;