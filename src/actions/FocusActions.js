import { SET_ID } from '../constants/Focus';

export function setId(id) {
  return {
    type: SET_ID,
    id,
  };
};