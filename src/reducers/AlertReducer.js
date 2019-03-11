import { 
  ALERT, CONFIRM_ALERT 
} from "../constants/Alert";

const initialState = {
  show: false,
  message: '',
};

function alertReducer(state = initialState, action) {
  let newState = {...state};

  switch (action.type) {
    case ALERT: {
      newState.show = true;
      newState.message = action.message;

      return newState;
    }
    case CONFIRM_ALERT: {
      newState.show = false;

      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default alertReducer;