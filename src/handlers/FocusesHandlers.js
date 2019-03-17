import { db, auth } from "../config/fbConfig";
import NavigationService from "../services/NavigationService";
import { 
  ADD_FOCUS, 
  UPDATE_FOCUS, 
  DELETE_FOCUS,
} from "../constants/Focuses";
import { 
  SECOND,
  EXPERIENCE_PER_SECOND,
} from "../reducers/FocusesReducer";

export function addFocusHandler(dispatch, focus) {
  db.collection('focuses').add(focus).then(doc => {
    dispatch({ type: ADD_FOCUS, id: doc.id, focus });
  }).catch(error => {
    console.error(error);
  });
};

export function deleteFocusHandler(dispatch, id) {
  db.collection('focuses').doc(id).delete().then(() => {
    dispatch({ type: DELETE_FOCUS, id });

    NavigationService.navigate('Focuses');
  }).catch(error => {
    console.error(error);
  })
};

export function updateFocusHandler(dispatch, id, focus) {
  db.collection('focuses').doc(id).set(focus).then(() => {
    dispatch({ type: UPDATE_FOCUS, id, focus });
  }).catch(error => {
    console.error(error);
  });
};

export function activateFocusHandler(dispatch, id, focus) {
  if (focus.active) {
    if (!focus.working) {
      focus.time = focus.workPeriod;
    }

    focus.working = true;
    focus.active = false;

    clearInterval(focus.timer);
  } else {
    focus.active = true;
    focus.timer = setInterval(
      () => updateFocusTimerHandler(dispatch, id, focus), 
      1000
    );
  }

  updateFocusHandler(dispatch, id, focus);
};

export function updateFocusTimerHandler(dispatch, id, focus) {
  if (focus.time >= SECOND) {
    focus.time -= SECOND;

    if (focus.working) {
      focus.experience += EXPERIENCE_PER_SECOND;

      if (focus.experience > 100) {
        focus.level++;
        focus.experience = 0;
      }
    }
  } else {
    clearInterval(focus.timer);

    if (focus.working) {
      focus.periods++;
      focus.time = focus.breakPeriod;
    } else {
      focus.time = focus.workPeriod;
    }

    focus.working = !focus.working;
    focus.active = false;
  }

  updateFocusHandler(dispatch, id, focus);
};

export function updateFocusCategories(dispatch, name, newName) {
  let query;
  query = db.collection('focuses');
  query = query.where('userId', '==', auth.currentUser.uid);
  query = query.where('category', '==', name);

  query.get().then(snapshot => {
    let batch = db.batch();

    snapshot.forEach(doc => {
      const focusRef = db.collection('focuses').doc(doc.id);
      batch.update(focusRef, { category: newName });
    });

    batch.commit().then(() => {
      snapshot.forEach(doc => {
        dispatch({ type: UPDATE_FOCUS, id: doc.id, focus: doc.data() });
      })
    }).catch(error => {
      console.error(error);
    });
  });
};