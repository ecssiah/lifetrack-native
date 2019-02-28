export const SET_SETTINGS = 'settings:set-settings';
export const SET_DEFAULT_WORK_PERIOD = 'settings:set-global-work-period';
export const SET_DEFAULT_WORK_GOAL = 'settings:set-global-work-goal';
export const SET_DEFAULT_BREAK_PERIOD = 'settings:set-global-break-period';

export function setSettings(settings) {
  return {
    type: SET_SETTINGS,
    settings,
  };
};

export function setDefaultWorkPeriod(period) {
  return {
    type: SET_DEFAULT_WORK_PERIOD,
    period,
  };
};

export function setDefaultWorkGoal(goal) {
  return {
    type: SET_DEFAULT_WORK_GOAL,
    goal,
  };
};

export function setDefaultBreakPeriod(period) {
  return {
    type: SET_DEFAULT_BREAK_PERIOD,
    period,
  };
};