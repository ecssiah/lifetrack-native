
// https://github.com/facebook/react-native/issues/10218
export function formatSpace(str) {
  return str.replace(/\u0020/, '\u00a0')
};

export function getElapsed(start) {
  return Math.floor((Date.now() - start) / 1000);
};

export function getToday() {
  let d = new Date();

  return d.setUTCHours(0, 0, 0, 0);
};

export function displayTime(time) {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor((time / 60) - hours * 60);
  const seconds = Math.floor(time - (hours * 60 * 60) - (minutes * 60));

  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
  const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

  if (hours > 0) {
    return `${hours}:${displayMinutes}:${displaySeconds}`;
  } else {
    return `${displayMinutes}:${displaySeconds}`;
  }
};
