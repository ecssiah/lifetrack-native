export const SET_FOCUSES = 'focuses:set-focuses';
export const ADD_FOCUS = 'focuses:add-focus';
export const DELETE_FOCUS = 'focuses:delete-focus';

export const SET_NAME = 'focuses:set-name';
export const SET_CATEGORY = 'focuses:set-category';
export const SET_TIME = 'focuses:set-time';
export const SET_WORKING = 'focuses:set-working';
export const SET_ACTIVE = 'focuses:set-active';
export const SET_TIMER = 'focuses:set-timer';
export const SET_WORK_PERIOD = 'focuses:set-work-period';
export const SET_WORK_GOAL = 'focuses:set-work-goal';
export const SET_BREAK_PERIOD = 'focuses:set-break-period';

export const UPDATE_TIME = 'focuses:update-time';
export const UPDATE_PERIODS = 'focuses:update-periods';
export const UPDATE_EXPERIENCE = 'focuses:update-experience';
export const RESET_PERIODS = 'focuses:reset-periods';

export function setFocuses(focuses) {
  return {
    type: SET_FOCUSES,
    focuses,
  };
};

export function addFocus(focus) {
  return {
    type: ADD_FOCUS,
    focus,
  };
};

export function deleteFocus(id) {
  return {
    type: DELETE_FOCUS,
    id,
  };
};

export function setName(id, name) {
  return {
    type: SET_NAME,
    id,
    name,
  };
};

export function setCategory(id, category) {
  return {
    type: SET_CATEGORY,
    id,
    category,
  };
};

export function setTime(id, time) {
  return {
    type: SET_TIME,
    id,
    time,
  };
};

export function setWorking(id, working) {
  return {
    type: SET_WORKING,
    id,
    working,
  };
};

export function setActive(id, active) {
  return {
    type: SET_ACTIVE,
    id,
    active,
  };
};

export function setTimer(id, timer) {
  return {
    type: SET_TIMER,
    id,
    timer,
  };
};

export function setWorkPeriod(id, period) {
  return {
    type: SET_WORK_PERIOD,
    id,
    period,
  };
};

export function setWorkGoal(id, goal) {
  return {
    type: SET_WORK_GOAL,
    id, 
    goal,
  };
};

export function setBreakPeriod(id, period) {
  return {
    type: SET_BREAK_PERIOD,
    id, 
    period,
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

export function updateExperience(id) {
  return {
    type: UPDATE_EXPERIENCE,
    id,
  };
};

export function resetPeriods(id) {
  return {
    type: RESET_PERIODS,
    id,
  };
};