import { db, auth } from "../config/firebaseConfig";
import { UPDATE_SETTINGS } from "../constants/Settings";

export async function updateSettings(dispatch, update) {
  const doc = db.collection('settings').doc(auth.currentUser.uid);
  await doc.set(settings);
  
  dispatch({ type: UPDATE_SETTINGS, update });
};