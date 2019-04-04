import { 
  SET_STATS,
  UPDATE_STATS, 
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
    default: {
      return newState
    }
  }
}

export default statsReducer