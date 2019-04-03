import { 
  UPDATE_STATUS,
  INC_TRACKED,
  DEC_TRACKED,
} from "../constants/Status"

function statusReducer(state = {}, action) {
  const newState = { ...state }

  switch(action.type) {
    case UPDATE_STATUS: {
      Object.assign(newState, action.update)

      return newState
    }
    case INC_TRACKED: {
      newState.tracked++

      return newState
    }
    case DEC_TRACKED: {
      newState.tracked--

      return newState
    }
    default: {
      return newState
    }
  }
}

export default statusReducer