
export function err(error) {
  console.error(error);
};

export function getElapsed(inactiveStart) {
  return Math.floor(
    (Date.now() - inactiveStart) / 1000
  );
};

export function getToday() {
  let d = new Date();

  return d.setUTCHours(0, 0, 0, 0);
};

export function displayTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = (time - minutes * 60).toFixed(0);

  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
  const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

  return `${displayMinutes}:${displaySeconds}`;
};
