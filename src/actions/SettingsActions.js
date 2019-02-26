export const LOAD_SETTINGS = 'settings:load-settings';
export const SET_GLOBAL_WORK_PERIOD = 'settings:set-global-work-period';
export const SET_GLOBAL_WORK_GOAL = 'settings:set-global-work-goal';
export const SET_GLOBAL_BREAK_PERIOD = 'settings:set-global-break-period';

export function loadSettings(settings) {
  return {
    type: LOAD_SETTINGS,
    settings,
  };
};

export function setDefaultWorkPeriod(period) {
  return {
    type: SET_GLOBAL_WORK_PERIOD,
    period,
  };
};

export function setDefaultWorkGoal(goal) {
  return {
    type: SET_GLOBAL_WORK_GOAL,
    goal,
  };
};

export function setDefaultBreakPeriod(period) {
  return {
    type: SET_GLOBAL_BREAK_PERIOD,
    period,
  };
};