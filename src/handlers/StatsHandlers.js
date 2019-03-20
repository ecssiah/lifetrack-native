import { db, auth } from "../config/fbConfig";
import { err } from "../utils";
import { 
  UPDATE_STATS,
  UPDATE_UNTRACKED 
} from "../constants/Stats";

export function updateStats(dispatch, update) {
  return new Promise(resolve => {
    const doc = db.collection('stats').doc(auth.currentUser.uid);

    doc.update(update).then(() => {
      dispatch({ type: UPDATE_STATS, update });

      resolve();
    }).catch(err);
  });
};

export function updateUntracked(dispatch, elapsed) {
  if (elapsed < 30) {
    return;
  } else {
    elapsed -= 30;
  }

  const statsRef = db.collection('stats').doc(auth.currentUser.uid);

  db.runTransaction(async transaction => {
    const doc = await transaction.get(statsRef);
    const untracked = Math.floor(doc.data().untracked + elapsed);

    transaction.update(statsRef, { untracked });
  }).then(() => {
    dispatch({ type: UPDATE_UNTRACKED, elapsed });
  }).catch(err);
};
