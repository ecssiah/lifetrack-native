import { db, auth } from "../config/firebaseConfig"
import { UPDATE_USER, USER_KEY } from "../constants/User"
import AsyncStorage from "@react-native-community/async-storage";


export function updateUser(dispatch, update) {
  dispatch({ type: UPDATE_USER, update })
}


export async function updateUserDB(update) {
  db.collection('user').doc(auth.currentUser.uid).update(update)
}


export async function updateUserLocal(update) {
  await AsyncStorage.mergeItem(
    USER_KEY, JSON.stringify({ [auth.currentUser.uid]: update })
  )
}


export async function updateUserEmail(dispatch, email) {
  const update = { email }

  await auth.currentUser.updateEmail(email)

  updateUserLocal(update)
  updateUser(dispatch, update)
}

