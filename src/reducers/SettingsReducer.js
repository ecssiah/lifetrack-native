import { 
  UPDATE_SETTINGS,
} from "../constants/Settings";

function settingsReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case UPDATE_SETTINGS: {
      Object.assign(newState, action.update);

      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default settingsReducer;