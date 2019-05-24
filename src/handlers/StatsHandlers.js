import { db, auth } from "../config/firebaseConfig"
import AsyncStorage from '@react-native-community/async-storage'
import { 
  UPDATE_STATS, STATS_KEY,
} from "../constants/Stats"


export function updateStats(dispatch, update) {
  dispatch({ type: UPDATE_STATS, update })
}


export function updateStatsDB(update) {
  db.collection('stats').doc(auth.currentUser.uid).update(update)
}


export async function updateStatsLocal(update) {
  await AsyncStorage.mergeItem(
    STATS_KEY, JSON.stringify({ [auth.currentUser.uid]: update })
  )
}