import { db, auth } from '../config/fbConfig';
import { 
  ADD_CATEGORY, 
  SET_CATEGORY_SHOW,
} from "../constants/Categories";

export function addCategoryHandler(dispatch, name, category) {
  const categoryUpdate = {};
  categoryUpdate[name] = category;

  db.collection('categories').doc(auth.currentUser.uid).update({
    categoryUpdate
  }).then(() => {
    dispatch({ type: ADD_CATEGORY, name, category });
  }).catch(error => {
    console.error(error);
  });
};

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