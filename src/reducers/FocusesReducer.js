import { 
  SET_FOCUSES,
  UPDATE_FOCUSES, 
  ADD_FOCUS, UPDATE_FOCUS, DELETE_FOCUS, 
} from "../constants/Focuses"

function focusesReducer(state = {}, action) {
  const newState = { ...state }

  switch (action.type) {
    case SET_FOCUSES: {
      return action.focuses
    }
    case UPDATE_FOCUSES: {
      for (const id in action.update) {
        newState[id] = Object.assign({}, newState[id], action.update[id])
      }

      return newState
    }
    case ADD_FOCUS: {
      newState[action.id] = action.focus

      return newState
    }
    case UPDATE_FOCUS: {
      Object.assign(newState[action.id], action.update)

      return newState
    }
    case DELETE_FOCUS: {
      delete newState[action.id]

      return newState
    }
    default: {
      return newState 
    }
  }
}

export default focusesReducer