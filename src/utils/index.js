
export function displayTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = (time - minutes * 60).toFixed(0);

  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
  const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

  return `${displayMinutes}:${displaySeconds}`;
};