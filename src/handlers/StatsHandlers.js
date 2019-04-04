import { db, auth } from "../config/firebaseConfig"
import { 
  UPDATE_STATS,
} from "../constants/Stats"

export async function updateStats(dispatch, update) {
  await db.collection('stats').doc(auth.currentUser.uid).update(update)

  dispatch({ type: UPDATE_STATS, update })
}
