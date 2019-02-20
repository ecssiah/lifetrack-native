export const SET_FOCUSES = 'focus:set_focuses';

export function setFocuses(focuses) {
  return {
    type: SET_FOCUSES,
    focuses,
  };
};