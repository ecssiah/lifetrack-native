import { db } from "../config/fbConfig";
import { ADD_FOCUS } from "../constants/Focuses";

export function addFocusHandler(dispatch, focus) {
  const docRef = db.collection('focuses').doc();

  const focusWithId = {
    id: docRef.id,
    ...focus,
  };

  docRef.collection('focuses').add(focusWithId).then(() => {
    dispatch({ type: ADD_FOCUS, focus });
  }).catch(error => 
    console.error(error)
  );
};