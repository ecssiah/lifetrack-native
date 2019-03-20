import { db, auth } from "../config/fbConfig";
import { err } from "../utils";
import { 
  UPDATE_STATS,
  UPDATE_UNTRACKED 
} from "../constants/Stats";

export async function updateStats(dispatch, update) {
  return new Promise(async resolve => {
    const doc = db.collection('stats').doc(auth.currentUser.uid);
    await doc.update(update).catch(err);

    dispatch({ type: UPDATE_STATS, update });
    resolve();
  });
};

export async function updateUntracked(dispatch, elapsed) {
  if (elapsed < 30) {
    return;
  } else {
    elapsed -= 30;
  }

  const statsRef = db.collection('stats').doc(auth.currentUser.uid);

  await db.runTransaction(async transaction => {
    const doc = await transaction.get(statsRef);
    const untracked = Math.floor(doc.data().untracked + elapsed);

    transaction.update(statsRef, { untracked });
  }).catch(err);
  
  dispatch({ type: UPDATE_UNTRACKED, elapsed });
};
