export const SET_CATEGORIES = 'categories:set-categories';
export const ADD_CATEGORY = 'categories:add-category';

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