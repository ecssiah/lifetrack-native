export const LOAD_SETTINGS = 'settings:load-settings';
export const SET_WORK_PERIOD = 'settings:set-work-period';
export const SET_WORK_GOAL = 'settings:set-work-goal';
export const SET_BREAK_PERIOD = 'settings:set-break-period';

export function loadSettings(settings) {
  return {
    type: LOAD_SETTINGS,
    settings,
  };
};

export function setWorkPeriod(period) {
  return {
    type: SET_WORK_PERIOD,
    period,
  };
};

export function setWorkGoal(goal) {
  return {
    type: SET_WORK_GOAL,
    goal,
  };
};

export function setBreakPeriod(period) {
  return {
    type: SET_BREAK_PERIOD,
    period,
  };
};