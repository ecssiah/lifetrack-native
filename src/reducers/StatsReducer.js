import { 
  SET_STATS,
  UPDATE_STATS, 
  UPDATE_UNTRACKED,
} from "../constants/Stats";

function statsReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case SET_STATS: {
      return action.stats;
    }
    case UPDATE_STATS: {
      Object.assign(newState, action.update);

      return newState;
    }
    case UPDATE_UNTRACKED: {
      newState.untracked += action.elapsed;

      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default statsReducer;