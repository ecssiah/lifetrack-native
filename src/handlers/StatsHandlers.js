import { db, auth } from "../config/firebaseConfig";
import { 
  UPDATE_STATS,
  UPDATE_UNTRACKED, 
  UNTRACKED_MINIMUM
} from "../constants/Stats";

export async function updateStats(dispatch, update) {
  return new Promise(async (resolve, reject) => {
    const doc = db.collection('stats').doc(auth.currentUser.uid);
    await doc.update(update).catch(error => {
      reject({update, error});
    });

    dispatch({ type: UPDATE_STATS, update });

    resolve();
  });
};

export async function updateUntracked(dispatch, elapsed) {
  if (elapsed <= UNTRACKED_MINIMUM) {
    return;
  } 

  elapsed -= UNTRACKED_MINIMUM;

  return new Promise(async (resolve, reject) => {
    const statsRef = db.collection('stats').doc(auth.currentUser.uid);

    const transactionUpdateFunc = async transaction => {
      const doc = await transaction.get(statsRef).catch(error => {
        reject(error);
      });

      const untracked = Math.floor(doc.data().untracked + elapsed);

      transaction.update(statsRef, { untracked });
    };

    await db.runTransaction(transactionUpdateFunc).catch(error => {
      reject(error);
    });

    dispatch({ type: UPDATE_UNTRACKED, elapsed });

    resolve();
  });
};
