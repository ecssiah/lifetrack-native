import { 
  SET_ID
} from "../actions/FocusActions";

function focusReducer(state = null, action) {
  switch (action.type) {
    case SET_ID:
      return action.id;
    default:
      return state;
  }
};

export default focusReducer;