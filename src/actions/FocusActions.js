export const ADD_FOCUS = 'focus:add-focus';
export const SET_FOCUSES = 'focus:set-focuses';

export function addFocus(focus) {
  return {
    type: ADD_FOCUS,
    focus,
  }
}

export function setFocuses(focuses) {
  return {
    type: SET_FOCUSES,
    focuses,
  };
};