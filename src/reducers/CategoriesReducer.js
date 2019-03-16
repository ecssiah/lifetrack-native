import { 
  UPDATE_CATEGORIES, 
  ADD_CATEGORY, DELETE_CATEGORY,
  SET_CATEGORY_NAME, SET_CATEGORY_SHOW,
  TOGGLE_CATEGORY_SHOW,
} from "../constants/Categories";

function categoriesReducer(state = [], action) {
  let newState = state.slice();

  switch (action.type) {
    case UPDATE_CATEGORIES: {
      return action.categories;
    }
    case ADD_CATEGORY: {
      newState.unshift(action.category);

      return newState;
    }
    case DELETE_CATEGORY: {
      const categoryIndex = newState.findIndex(category => 
        category.name === action.category.name
      );

      if (categoryIndex !== -1) {
        newState.splice(categoryIndex, 1);
      } else {
        console.warn(action.category.name + ' was not found');
      }
        
      return newState;
    }
    case SET_CATEGORY_NAME: {
      const categoryIndex = newState.findIndex(category =>
        category.name === action.name
      );

      newState[categoryIndex].name = action.newName;

      return newState;
    }
    case SET_CATEGORY_SHOW: {
      const categoryIndex = newState.findIndex(category =>
        category.name === action.name
      );

      newState[categoryIndex].show = action.show;

      return newState;
    }
    case TOGGLE_CATEGORY_SHOW: {
      const categoryIndex = newState.findIndex(category => {
        return category.name === action.name
      });

      newState[categoryIndex].show = !newState[categoryIndex].show;

      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default categoriesReducer;