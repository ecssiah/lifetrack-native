export const ADD_FOCUS = 'focus:add-focus';
export const SET_FOCUSES = 'focus:set-focuses';
export const SET_TIME = 'focus:set-time';
export const UPDATE_TIME = 'focus:update-time';
export const UPDATE_PERIODS = 'focus:update-periods';
export const RESET_PERIODS = 'focus:reset-periods';
export const UPDATE_EXPERIENCE = 'focus:update-experience';

export function addFocus(focus) {
  return {
    type: ADD_FOCUS,
    focus,
  };
};

export function setFocuses(focuses) {
  return {
    type: SET_FOCUSES,
    focuses,
  };
};

export function setTime(id, time) {
  return {
    type: SET_TIME,
    id,
    time,
  };
};

export function updateTime(id) {
  return {
    type: UPDATE_TIME,
    id,
  };
};

export function updatePeriods(id) {
  return {
    type: UPDATE_PERIODS,
    id,
  };
};

export function resetPeriods(id) {
  return {
    type: RESET_PERIODS,
    id,
  };
};

export function updateExperience(id) {
  return {
    type: UPDATE_EXPERIENCE,
    id,
  };
};