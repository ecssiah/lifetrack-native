export const ADD_FOCUS = 'focuses:add-focus';
export const SET_FOCUSES = 'focuses:set-focuses';
export const SET_TIME = 'focuses:set-time';
export const UPDATE_TIME = 'focuses:update-time';
export const UPDATE_PERIODS = 'focuses:update-periods';
export const RESET_PERIODS = 'focuses:reset-periods';
export const UPDATE_EXPERIENCE = 'focuses:update-experience';
export const SET_WORKING = 'focuses:set-working';
export const SET_TIMER_ACTIVE = 'focuses:set-timer-active';
export const SET_TIMER = 'focuses:set-timer';

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

export function setWorking(id, working) {
  return {
    type: SET_WORKING,
    id,
    working,
  };
};

export function setTimerActive(id, timerActive) {
  return {
    type: SET_TIMER_ACTIVE,
    id,
    timerActive,
  };
};

export function setTimer(id, timer) {
  return {
    type: SET_TIMER,
    id,
    timer,
  };
};
