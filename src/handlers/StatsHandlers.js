import { db, auth } from "../config/firebaseConfig"
import { 
  UNTRACKED_MINIMUM, UNTRACKED_MAXIMUM,
  UPDATE_STATS, UPDATE_UNTRACKED, 
} from "../constants/Stats"

export async function updateStats(dispatch, update) {
  await db.collection('stats').doc(auth.currentUser.uid).update(update)

  dispatch({ type: UPDATE_STATS, update })
}

export async function updateUntracked(dispatch, elapsed) {
  if (elapsed <= UNTRACKED_MINIMUM || elapsed > UNTRACKED_MAXIMUM) {
    return
  } else {
    elapsed -= UNTRACKED_MINIMUM
  }

  const statsRef = db.collection('stats').doc(auth.currentUser.uid)

  const transactionUpdateFunc = async transaction => {
    const doc = await transaction.get(statsRef)
    const untracked = Math.floor(doc.data().untracked + elapsed)

    transaction.update(statsRef, { untracked })
  }

  await db.runTransaction(transactionUpdateFunc)

  dispatch({ type: UPDATE_UNTRACKED, elapsed })
}
