import { 
  UPDATE_STATUS,
} from "../constants/Status"

function statusReducer(state = {}, action) {
  const newState = { ...state }

  switch(action.type) {
    case UPDATE_STATUS: {
      Object.assign(newState, action.update)

      return newState
    }
    default: {
      return newState
    }
  }
}

export default statusReducer