import { db, auth } from "../config/firebaseConfig";
import { UPDATE_SETTINGS } from "../constants/Settings";

export async function updateSettings(dispatch, update) {
  await db.collection('settings').doc(auth.currentUser.uid).update(update);
  
  dispatch({ type: UPDATE_SETTINGS, update });
};