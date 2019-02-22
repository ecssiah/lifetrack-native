export const SET_FOCUS_ID = 'focusID:set-focus-id';

export function setFocusID(id) {
  return {
    type: SET_FOCUS_ID,
    id,
  };
};
