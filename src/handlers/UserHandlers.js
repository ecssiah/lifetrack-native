import { db, auth } from "../config/firebaseConfig";
import { UPDATE_USER } from "../constants/User";

export async function updateUser(dispatch, update) {
  await db.collection('user').doc(auth.currentUser.uid).update(update);

  dispatch({ type: UPDATE_USER, update });
};