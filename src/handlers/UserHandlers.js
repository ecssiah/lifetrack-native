import { db, auth } from "../config/firebaseConfig"
import { extend } from 'lodash-es'
import { UPDATE_USER, USER_KEY } from "../constants/User"
import AsyncStorage from "@react-native-community/async-storage";


export function updateUser(dispatch, update) {
  dispatch({ type: UPDATE_USER, update })
}


export async function updateUserDB(update) {
  db.collection('user').doc(auth.currentUser.uid).update(update)
}


export async function updateUserLocal(update) {
  try {
    const userCollectionRaw = await AsyncStorage.getItem(USER_KEY)
    const userCollection = JSON.parse(userCollectionRaw)

    extend(userCollection[auth.currentUser.uid], update)

    AsyncStorage.setItem(USER_KEY, JSON.stringify(userCollection))
  } catch(e) {
    console.error('updateUserLocal', e)
  }
}


export async function updateUserEmail(dispatch, email) {
  const update = { email }

  await auth.currentUser.updateEmail(email)

  updateUserLocal(update)
  updateUser(dispatch, update)
}

