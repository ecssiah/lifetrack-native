import { db, auth } from "../config/firebaseConfig"
import { UPDATE_SETTINGS } from "../constants/Settings"


export function updateSettings(dispatch, update) {
  dispatch({ type: UPDATE_SETTINGS, update })
}


export async function updateSettingsDB(update) {
  db.collection('settings').doc(auth.currentUser.uid).update(update)
}

