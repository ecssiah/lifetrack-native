import { 
  UPDATE_SETTINGS,
} from "../constants/Settings";

function settingsReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case UPDATE_SETTINGS: {
      return action.settings;
    }
    default: {
      return newState;
    }
  }
};

export default settingsReducer;