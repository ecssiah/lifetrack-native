import { LOAD_SETTINGS } from "../actions/SettingsActions";

function settingsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_SETTINGS:
      return action.settings;
    default:
      return state;
  }
};

export default settingsReducer;