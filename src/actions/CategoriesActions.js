export const SET_CATEGORIES = 'categories:set-categories';
export const ADD_CATEGORY = 'categories:add-category';
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