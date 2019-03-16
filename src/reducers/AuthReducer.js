import { 
  SIGNUP_SUCCESS, SIGNUP_ERROR, 
  SIGNIN_SUCCESS, SIGNIN_ERROR, 
  SIGNOUT_SUCCESS, SIGNOUT_ERROR,
} from "../constants/Auth";

function authReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case SIGNUP_SUCCESS: {
      console.warn("it's happening!");
      newState.error = null;

      return newState;
    }
    case SIGNUP_ERROR: {
      newState.error = action.error;

      return newState;
    }
    case SIGNIN_SUCCESS: {
      newState.error = null;

      return newState; 
    }
    case SIGNIN_ERROR: {
      newState.error = action.error;

      return newState;
    }
    case SIGNOUT_SUCCESS: {
      newState.error = null;

      return newState; 
    }
    case SIGNOUT_ERROR: {
      newState.error = action.error;

      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default authReducer;