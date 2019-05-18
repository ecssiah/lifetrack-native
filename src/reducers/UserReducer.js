import { 
  SET_USER,
  UPDATE_USER,
} from "../constants/User"


function userReducer(state = {}, action) {
  const newState = { ...state }

  switch (action.type) {
    case SET_USER: {
      return action.user
    }
    case UPDATE_USER: {
      Object.assign(newState, action.update)

      return newState
    }
    default: {
      return newState
    }
  }
}

export default userReducer