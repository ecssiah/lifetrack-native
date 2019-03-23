import { 
  SET_SETTINGS,
  UPDATE_SETTINGS,
} from "../constants/Settings";

function settingsReducer(state = {}, action) {
  const newState = { ...state };

  switch (action.type) {
    case SET_SETTINGS: {
      return action.settings;
    }
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