import { 
  SET_APP_STATE, 
  SET_TIME_INACTIVE 
} from "../constants/Status";

const initialState = {
  appState: 'active',
};

function statusReducer(state = initialState, action) {
  let newState = {...state};

  switch(action.type) {
    case SET_APP_STATE: {
      newState.appState = action.appState;

      return newState;
    }
    case SET_TIME_INACTIVE: {
      newState.timeInactive = action.timeInactive;

      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default statusReducer;