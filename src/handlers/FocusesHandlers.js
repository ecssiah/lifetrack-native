import { db } from "../config/fbConfig";
import { 
  ADD_FOCUS, 
  UPDATE_FOCUS 
} from "../constants/Focuses";

export function addFocusHandler(dispatch, focus) {
  db.collection('focuses').add(focus).then(doc => {
    dispatch({ type: ADD_FOCUS, id: doc.id, focus });
  }).catch(error => 
    console.error(error)
  );
};

export function updateFocusHandler(dispatch, id, focus) {
  db.collection('focuses').doc(id).set(focus).then(() => {
    dispatch({ type: UPDATE_FOCUS, id, focus });
  }).catch(error => {
    console.error(error);
  });
}