import { db, auth } from "../config/fbConfig";
import { err } from "../utils";
import { 
  UPDATE_STATS,
  UPDATE_UNTRACKED 
} from "../constants/Stats";

export function updateStats(dispatch, update, callback = null) {
  db.collection('stats').doc(auth.currentUser.uid).update(
    update
  ).then(() => {
    if (callback) {
      callback();
    }

    dispatch({ type: UPDATE_STATS, update });
  }).catch(error => err(error));
};

export function updateUntracked(dispatch, elapsed, callback = null) {
  if (elapsed < 30) {
    if (callback) {
      callback();
    }

    return;
  }

  const statsRef = db.collection('stats').doc(auth.currentUser.uid);

  db.runTransaction(async transaction => {
    const doc = await transaction.get(statsRef);
    const newUntracked = Math.floor(doc.data().untracked + elapsed);

    transaction.update(statsRef, { untracked: newUntracked });
  }).then(() => {
    if (callback) {
      callback();
    }

    dispatch({ type: UPDATE_UNTRACKED, elapsed });
  }).catch(error => err(error));
};
