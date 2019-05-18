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
  try {
    const statsCollectionRaw = await AsyncStorage.getItem(STATS_KEY)
    const statsCollection = JSON.parse(statsCollectionRaw)

    extend(statsCollection[auth.currentUser.uid], update)

    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(updateStats))
  } catch(e) {
    console.error('updateStatsLocal', e)
  }
}