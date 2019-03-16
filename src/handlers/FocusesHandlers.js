import { db } from "../config/fbConfig";
import { ADD_FOCUS } from "../constants/Focuses";

export function addFocusHandler(dispatch, focus) {
  db.collection('focuses').add(focus).then(doc => {
    dispatch({ type: ADD_FOCUS, id: doc.id, focus });
  }).catch(error => 
    console.error(error)
  );
};