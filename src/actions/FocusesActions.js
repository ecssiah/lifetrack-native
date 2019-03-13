import {
  LOAD_FOCUSES_REQUEST,
  SET_FOCUSES, DELETE_FOCUS, ADD_FOCUS, 
  SET_NAME, SET_CATEGORY, SET_ACTIVE, SET_TIME, SET_TIMER,
  SET_WORKING, SET_WORK_PERIOD, SET_WORK_GOAL, SET_BREAK_PERIOD,
  UPDATE_EXPERIENCE, UPDATE_TIME, UPDATE_CATEGORIES, UPDATE_PERIODS,
  RESET_PERIODS,
} from '../constants/Focuses';

export function requestFocuses() {
  return {
    type: LOAD_FOCUSES_REQUEST,
  };
};

export function loadFocuses() {
  return {
    type: LOAD_FOCUSES,
  };
};

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

export function updateCategories(category, newName) {
  return {
    type: UPDATE_CATEGORIES,
    category,
    newName,
  };
};