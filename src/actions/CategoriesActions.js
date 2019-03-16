import { 
  UPDATE_CATEGORIES, 
  ADD_CATEGORY, DELETE_CATEGORY,
  SET_CATEGORY_NAME, SET_CATEGORY_SHOW,
  TOGGLE_CATEGORY_SHOW,
} from '../constants/Categories';

export function updateCategories(categories) {
  return {
    type: UPDATE_CATEGORIES,
    categories,
  };
};

export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category,
  };
};

export function deleteCategory(category) {
  return {
    type: DELETE_CATEGORY,
    category,
  };
};

export function setCategoryName(name, newName) {
  return {
    type: SET_CATEGORY_NAME,
    name,
    newName,
  };
};

export function setCategoryShow(name, show) {
  return {
    type: SET_CATEGORY_SHOW,
    name,
    show,
  };
};