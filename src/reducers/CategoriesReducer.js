import { 
  ADD_CATEGORY, SET_CATEGORIES, SET_CATEGORY_SHOW, TOGGLE_CATEGORY_SHOW 
} from "../actions/CategoriesActions";

function categoriesReducer(state = [], action) {
  let newState = state.slice();

  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    case ADD_CATEGORY:
      newState.push(action.category);

      return newState;
    case SET_CATEGORY_SHOW: {
      const categoryIndex = newState.findIndex(category => {
        return category.name === action.name
      });

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
    default:
      return newState;
  }
};

export default categoriesReducer;