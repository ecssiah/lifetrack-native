import { db, auth } from "../config/firebaseConfig";
import { err } from "../utils";
import { 
  EXPERIENCE_PER_SECOND,
  ADD_FOCUS, UPDATE_FOCUS, DELETE_FOCUS, UPDATE_FOCUSES,
} from "../constants/Focuses";

export async function addFocus(dispatch, focus) {
  const executor = async (resolve, reject) => {
    const doc = await db.collection('focuses').add(focus).catch(error =>{
      reject({focus, error});
    });

    dispatch({ type: ADD_FOCUS, id: doc.id, focus });

    resolve();
  };

  return new Promise(executor);
};

export async function deleteFocus(dispatch, id) {
  const executor = async (resolve, reject) => {
    await db.collection('focuses').doc(id).delete().catch(error => {
      reject(error);
    });

    dispatch({ type: DELETE_FOCUS, id });

    resolve();
  };

  return new Promise(executor);
};

export async function updateFocus(dispatch, id, update) {
  const executor = async (resolve, reject) => {
    await db.collection('focuses').doc(id).update(update).catch(error => {
      reject({update, error});
    });

    dispatch({ type: UPDATE_FOCUS, id, update }); 

    resolve();
  };

  return new Promise(executor);
};

export async function updateFocusCategories(dispatch, name, newName) {
  const executor = async (resolve, reject) => {
    let query;
    query = db.collection('focuses');
    query = query.where('userId', '==', auth.currentUser.uid);
    query = query.where('category', '==', name);

    let update = {};
    const batch = db.batch();

    const querySnapshot = await query.get().catch(error => {
      reject({name, error })
    });

    querySnapshot.forEach(doc => {
      update[doc.id] = { category: newName }; 
      batch.update(doc.ref, update[doc.id]);
    });

    await batch.commit().catch(error => reject({ update, error }));

    dispatch({ type: UPDATE_FOCUSES, update });

    resolve();
  };

  return new Promise(executor);
};

export async function updateExperience(dispatch, querySnapshot, elapsed) {
  const executor = async (resolve, reject) => {
    let update = {};
    let promises = [];
    
    querySnapshot.forEach(doc => {
      const transactionUpdateFunc = async transaction => {
        const deltaExp = EXPERIENCE_PER_SECOND * elapsed;

        const docSnapshot = await transaction.get(doc.ref).catch(error => {
          reject(error);
        });

        update[docSnapshot.id] = {
          level: docSnapshot.data().level,
          experience: docSnapshot.data().experience + deltaExp,
        };

        while (update[docSnapshot.id].experience >= 100) {
          update[docSnapshot.id].level++;
          update[docSnapshot.id].experience -= 100;
        }

        transaction.update(doc.ref, update[docSnapshot.id]);
      };

      promises.push(db.runTransaction(transactionUpdateFunc));
    });

    await Promise.all(promises).catch(err);

    dispatch({ type: UPDATE_FOCUSES, update });

    resolve();
  };

  return new Promise(executor);
};