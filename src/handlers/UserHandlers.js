import { db, auth } from "../config/firebaseConfig";
import { UPDATE_USER } from "../constants/User";

export async function updateUser(dispatch, update) {
  const executor = async (resolve, reject) => {
    const doc = db.collection('user').doc(auth.currentUser.uid);

    await doc.update(update).catch(error => {
      reject(error);
    });

    dispatch({ type: UPDATE_USER, update });

    resolve();
  };

  return new Promise(executor);
};