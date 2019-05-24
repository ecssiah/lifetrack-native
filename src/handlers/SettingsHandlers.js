import { db, auth } from "../config/firebaseConfig"
import AsyncStorage from "@react-native-community/async-storage";
import { UPDATE_SETTINGS, SETTINGS_KEY } from "../constants/Settings"


export function updateSettings(dispatch, update) {
  dispatch({ type: UPDATE_SETTINGS, update })
}


export async function updateSettingsDB(update) {
  db.collection('settings').doc(auth.currentUser.uid).update(update)
}


export async function updateSettingsLocal(update) {
  await AsyncStorage.mergeItem(
    SETTINGS_KEY, JSON.stringify({ [auth.currentUser.uid]: update })
  )
}
