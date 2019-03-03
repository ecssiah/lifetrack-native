export const SET_CATEGORIES = 'categories:set-categories';
export const ADD_CATEGORY = 'categories:add-category';
export const DELETE_CATEGORY = 'categories:delete-category';
export const SET_CATEGORY_NAME = 'categories:set-category-name';
export const SET_CATEGORY_SHOW = 'categories:set-category-show';
export const TOGGLE_CATEGORY_SHOW = 'categories:toggle-category-show';

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories,
  };
};

export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category,
  };
};

export function deleteCategory(name) {
  return {
    type: DELETE_CATEGORY,
    name,
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

export function toggleCategoryShow(name) {
  return {
    type: TOGGLE_CATEGORY_SHOW,
    name,
  };
};