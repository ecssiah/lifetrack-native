import { 
  SET_STATS,
  UPDATE_STATS, 
  UPDATE_UNTRACKED, UPDATE_UNTRACKED_HISTORY,
} from "../constants/Stats"

function statsReducer(state = {}, action) {
  const newState = { ...state }

  switch (action.type) {
    case SET_STATS: {
      return action.stats
    }
    case UPDATE_STATS: {
      Object.assign(newState, action.update)

      return newState
    }
    case UPDATE_UNTRACKED: {
      newState.untracked += action.elapsed

      return newState
    }
    case UPDATE_UNTRACKED_HISTORY: {
      if (newState.untrackedHistory[action.time]) {
        newState.untrackedHistory[action.time] += action.elapsed
      } else {
        newState.untrackedHistory[action.time] = action.elapsed
      }

      return newState
    }
    default: {
      return newState
    }
  }
}

export default statsReducer