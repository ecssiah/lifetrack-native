import { db, auth } from '../config/fbConfig';
import { SET_CATEGORY_SHOW } from "../constants/Categories";

export function setCategoryShowHandler(dispatch, name, show) {
  const categoryUpdate = {};
  categoryUpdate[name] = { show };

  db.collection('categories').doc(auth.currentUser.uid).update(
    categoryUpdate
  ).then(() => {
    dispatch({ type: SET_CATEGORY_SHOW, name, show });
  }).catch(error => {
    console.error(error);
  }); 
};