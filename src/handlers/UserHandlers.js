import { db, auth } from "../config/firebaseConfig"
import { UPDATE_USER } from "../constants/User"

export async function updateUser(dispatch, update) {
  await db.collection('user').doc(auth.currentUser.uid).update(update)

  dispatch({ type: UPDATE_USER, update })
}

export async function updateUserEmail(dispatch, email) {
  const user = auth.currentUser

  await user.updateEmail(email)
  await updateUser(dispatch, { email })

  dispatch({ type: UPDATE_USER, update: { email }})
}