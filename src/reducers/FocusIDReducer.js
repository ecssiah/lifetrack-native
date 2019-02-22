import { SET_FOCUS_ID } from "../actions/FocusIDActions";

export const SECOND = 1 / 60.0;
export const EXPERIENCE_PER_SECOND = 1 / 60.0;

function focusIDReducer(state = null, action) {
  switch (action.type) {
    case SET_FOCUS_ID:
      return action.id;
    default:
      return state;
  }
};

export default focusIDReducer;