
// https://github.com/facebook/react-native/issues/10218
export function formatSpace(str) {
  return str.replace(/\u0020/, '\u00a0')
}

export function getElapsed(start) {
  return Math.floor((Date.now() - start) / 1000)
}

export function getToday(offset = 0) {
  let d = new Date()

  d.setTime(d.getTime() + offset * 24 * 60 * 60 * 1000)

  return d.setUTCHours(0, 0, 0, 0)
}

export function displayTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time - minutes * 60)

  const displayMinutes = minutes < 10 ? '0' + minutes : minutes
  const displaySeconds = seconds < 10 ? '0' + seconds : seconds

  return `${displayMinutes}:${displaySeconds}`
}
