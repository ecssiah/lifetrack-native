import { err } from "../utils";
import { db, auth } from "../config/firebaseConfig";
import { UPDATE_SETTINGS } from "../constants/Settings";

export async function updateSettings(dispatch, settings) {
  const doc = db.collection('settings').doc(auth.currentUser.uid);
  await doc.set(settings).catch(err);
  
  dispatch({ type: UPDATE_SETTINGS, update: settings });
};