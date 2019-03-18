
export function getToday() {
  let d = new Date();

  return d.setUTCHours(0, 0, 0, 0);
};

export function sameDate(date1, date2) {
  let d1 = new Date(date1);
  let d2 = new Date(date2); 

  return d1.setUTCHours(0, 0, 0, 0) === d2.setUTCHours(0, 0, 0, 0);
};

export function displayTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = (time - minutes * 60).toFixed(0);

  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
  const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

  return `${displayMinutes}:${displaySeconds}`;
};
