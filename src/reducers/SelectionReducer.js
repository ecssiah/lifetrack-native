import { 
  UPDATE_SELECTION,
} from "../constants/Selection";

function selectionReducer(state = {}, action) {
  const newState = { ...state };

  switch (action.type) {
    case UPDATE_SELECTION: {
      Object.assign(newState, action.update); 

      return newState;
    }
    default: {
      return newState;
    } 
  }
};

export default selectionReducer;