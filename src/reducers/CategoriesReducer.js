import { 
  UPDATE_CATEGORIES, 
  ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, 
  SET_CATEGORY_NAME,
} from "../constants/Categories";

function categoriesReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case UPDATE_CATEGORIES: {
      return action.categories;
    }
    case ADD_CATEGORY: {
      newState[action.name] = { 
        show: true 
      }; 

      return newState;
    }
    case UPDATE_CATEGORY: {
      Object.assign(newState[action.name], action.update);

      return newState;
    }
    case DELETE_CATEGORY: {
      delete newState[action.name];
        
      return newState;
    }
    case SET_CATEGORY_NAME: {
      newState[action.newName] = newState[action.name];
      delete newState[action.name];

      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default categoriesReducer;