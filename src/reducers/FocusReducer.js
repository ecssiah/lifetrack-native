import { 
  SET_ID, SET_WORKING, SET_TIMER_ACTIVE, SET_TIMER 
} from "../actions/FocusActions";

const initialState = {
  working: true,
  timerActive: false,
  timer: null,
};

function focusReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case SET_ID:
      newState = Object.assign({}, state);
      newState.id = action.id;

      return newState;
    case SET_WORKING:
      newState = Object.assign({}, state);
      newState.working = action.working;

      return newState;
    case SET_TIMER_ACTIVE:
      newState = Object.assign({}, state);
      newState.timerActive = action.timerActive;

      return newState;
    case SET_TIMER:
      newState = Object.assign({}, state);
      newState.timer = action.timer;

      return newState;
    default:
      return state;
  }
};

export default focusReducer;