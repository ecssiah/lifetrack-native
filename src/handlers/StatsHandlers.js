import { db, auth } from "../config/firebaseConfig"
import { 
  UPDATE_STATS,
} from "../constants/Stats"


export function updateStats(dispatch, update) {
  dispatch({ type: UPDATE_STATS, update })
}


export function updateStatsDB(update) {
  db.collection('stats').doc(auth.currentUser.uid).update(update)
}
