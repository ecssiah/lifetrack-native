import { db, auth } from "../config/firebaseConfig"
import { extend } from 'lodash-es'
import AsyncStorage from "@react-native-community/async-storage";
import { UPDATE_SETTINGS, SETTINGS_KEY } from "../constants/Settings"


export function updateSettings(dispatch, update) {
  dispatch({ type: UPDATE_SETTINGS, update })
}


export async function updateSettingsDB(update) {
  db.collection('settings').doc(auth.currentUser.uid).update(update)
}


export async function updateSettingsLocal(update) {
  try {
    const settingsCollectionRaw = await AsyncStorage.getItem(SETTINGS_KEY)
    const settingsCollection = JSON.parse(settingsCollectionRaw)

    extend(settingsCollection[auth.currentUser.uid], update) 

    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsCollection))
  } catch(e) {
    console.error('updateSettingsLocal', e)
  }
}
