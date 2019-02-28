import { ADD_CATEGORY, SET_CATEGORIES } from "../actions/CategoriesActions";

function categoriesReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    case ADD_CATEGORY:
      newState.types.push(action.category);

      return newState;
    default:
      return newState;
  }
};

export default categoriesReducer;