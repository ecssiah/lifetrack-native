export const SET_ID = 'focus:set-id';

export function setId(id) {
  return {
    type: SET_ID,
    id,
  };
};