import { db, auth } from "../config/firebaseConfig"
import { UPDATE_USER } from "../constants/User"


export function updateUser(dispatch, update) {
  dispatch({ type: UPDATE_USER, update })
}


export async function updateUserDB(update) {
  db.collection('user').doc(auth.currentUser.uid).update(update)
}


export async function updateUserEmail(dispatch, email) {
  const update = { email }

  await auth.currentUser.updateEmail(email)

  updateUser(dispatch, update)
  updateUserDB(update)
}

