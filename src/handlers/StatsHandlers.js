import { db, auth } from "../config/firebaseConfig";
import { getElapsed, err } from "../utils";
import { 
  UPDATE_STATS, UPDATE_UNTRACKED, UNTRACKED_MINIMUM
} from "../constants/Stats";
import { 
  searchForWorkingFocuses, 
  deactivateFocuses,
  requestFocusUpdate, 
} from "./FocusesHandlers";

export async function updateStats(dispatch, update) {
  await db.collection('stats').doc(auth.currentUser.uid).update(update);

  dispatch({ type: UPDATE_STATS, update });
};

export async function updateUntracked(dispatch, elapsed) {
  if (elapsed <= UNTRACKED_MINIMUM) {
    return;
  } else {
    elapsed -= UNTRACKED_MINIMUM;
  }

  const statsRef = db.collection('stats').doc(auth.currentUser.uid);

  const transactionUpdateFunc = async transaction => {
    const doc = await transaction.get(statsRef);
    const untracked = Math.floor(doc.data().untracked + elapsed);

    transaction.update(statsRef, { untracked });
  };

  await db.runTransaction(transactionUpdateFunc);

  dispatch({ type: UPDATE_UNTRACKED, elapsed });
};

export async function updateActiveFocuses(dispatch, activeStart) {
  const querySnapshot = await searchForWorkingFocuses();

  if (!querySnapshot.empty) {
    const elapsed = getElapsed(activeStart);

    requestFocusUpdate(dispatch, querySnapshot, elapsed);

    await deactivateFocuses(dispatch, querySnapshot);
  }
};
