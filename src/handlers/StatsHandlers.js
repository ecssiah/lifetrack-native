import { db, auth } from "../config/firebaseConfig"
import { 
  UNTRACKED_MINIMUM, UNTRACKED_MAXIMUM,
  UPDATE_STATS, UPDATE_UNTRACKED, UPDATE_UNTRACKED_HISTORY, 
} from "../constants/Stats"
import { getToday } from "../../lib/utils";

export async function updateStats(dispatch, update) {
  await db.collection('stats').doc(auth.currentUser.uid).update(update)

  dispatch({ type: UPDATE_STATS, update })
}


function getUpdatedUntrackedHistory(doc, elapsed) {
  const history = { ...doc.data().untrackedHistory }
  const currentTime = Date.now()
  const elapsedTime = currentTime + elapsed * 1000
  const today = getToday()
  const tomorrow = getToday(1)

  if (elapsedTime > tomorrow) {
    const overlapTime = tomorrow - elapsedTime

    history[tomorrow] = overlapTime

    if (history[today]) {
      history[today] += (elapsedTime - overlapTime) / 1000
    } else {
      history[today] = (elapsedTime - overlapTime) / 1000
    }
  } else {
    if (history[today]) {
      history[today] += elapsed
    } else {
      history[today] = elapsed
    }
  }

  return history
}


export async function updateUntracked(dispatch, elapsed) {
  if (elapsed <= UNTRACKED_MINIMUM || elapsed > UNTRACKED_MAXIMUM) {
    return
  } else {
    elapsed -= UNTRACKED_MINIMUM
  }

  let untrackedHistory 
  const statsRef = db.collection('stats').doc(auth.currentUser.uid)

  const transactionUpdateFunc = async transaction => {
    const doc = await transaction.get(statsRef)

    untrackedHistory = getUpdatedUntrackedHistory(doc, elapsed)

    const update = {
      untracked: Math.floor(doc.data().untracked + elapsed),
      untrackedHistory,
    }

    transaction.update(statsRef, update)
  }

  await db.runTransaction(transactionUpdateFunc)

  dispatch({ type: UPDATE_UNTRACKED, elapsed })

  if (untrackedHistory[getToday()]) {
    dispatch({ 
      type: UPDATE_UNTRACKED_HISTORY, 
      time: getToday(), 
      elapsed: untrackedHistory[getToday()], 
    })
  }

  if (untrackedHistory[getToday(1)]) {
    dispatch({ 
      type: UPDATE_UNTRACKED_HISTORY, 
      time: getToday(1), 
      elapsed: untrackedHistory[getToday(1)], 
    })
  }
}
