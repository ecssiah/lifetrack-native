import { SELECT_FOCUS } from "../actions/SelectionActions";

function selectionReducer(state = null, action) {
  switch (action.type) {
    case SELECT_FOCUS:
      return action.id;
    default:
      return state;
  }
};

export default selectionReducer;