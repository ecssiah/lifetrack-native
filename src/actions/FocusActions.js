export const SET_ID = 'focus:set-id';
export const SET_WORKING = 'focus:set-working';
export const SET_TIMER_ACTIVE = 'focus:set-timer-active';
export const SET_TIMER = 'focus:set-timer';

export function setID(id) {
  return {
    type: SET_ID,
    id,
  };
};

export function setWorking(working) {
  return {
    type: SET_WORKING,
    working,
  };
};

export function setTimerActive(timerActive) {
  return {
    type: SET_TIMER_ACTIVE,
    timerActive,
  };
};

export function setTimer(timer) {
  return {
    type: SET_TIMER,
    timer,
  };
};
