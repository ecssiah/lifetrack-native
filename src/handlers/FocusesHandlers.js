import { db, auth } from "../config/fbConfig";
import NavigationService from "../services/NavigationService";
import { 
  ADD_FOCUS, UPDATE_FOCUS, DELETE_FOCUS,
  SECOND, EXPERIENCE_PER_SECOND, UPDATE_FOCUS_TIMER_FIELDS,
} from "../constants/Focuses";

export function addFocus(dispatch, focus) {
  db.collection('focuses').add(focus).then(doc => {
    dispatch({ type: ADD_FOCUS, id: doc.id, focus });
  }).catch(error => {
    console.error(error);
  });
};

export function deleteFocus(dispatch, id) {
  db.collection('focuses').doc(id).delete().then(() => {
    dispatch({ type: DELETE_FOCUS, id });

    NavigationService.navigate('Focuses');
  }).catch(error => {
    console.error(error);
  })
};

export function updateFocus(dispatch, id, focus) {
  db.collection('focuses').doc(id).set(focus).then(() => {
    dispatch({ type: UPDATE_FOCUS, id, focus });
  }).catch(error => {
    console.error(error);
  });
};

export function updateFocusTimerFields(dispatch, id, focus) {
  db.collection('focuses').doc(id).update({
    time: focus.time,
    timer: focus.timer,
    level: focus.level,
    experience: focus.experience,
  }).then(() => {
    dispatch({ type: UPDATE_FOCUS_TIMER_FIELDS, id, focus });
  }).catch(error => {
    console.error(error);
  });  
};

export function activateFocus(dispatch, id, focus) {
  if (focus.active) {
    if (!focus.working) {
      focus.time = focus.workPeriod * 60;
    }

    focus.working = true;
    focus.active = false;

    clearInterval(focus.timer);
  } else {
    focus.active = true;
    focus.timer = setInterval(
      () => updateFocusTimer(dispatch, id, focus), 
      1000
    );
  }

  updateFocus(dispatch, id, focus);
};

export function updateFocusTimer(dispatch, id, focus) {
  if (focus.time > 0) {
    focus.time -= 1;

    if (focus.working) {
      focus.experience += EXPERIENCE_PER_SECOND;

      if (focus.experience >= 100) {
        focus.level++;
        focus.experience -= 100;
      }
    }

    updateFocusTimerFields(dispatch, id, focus);
  } else {
    clearInterval(focus.timer);

    if (focus.working) {
      focus.periods++;
      focus.time = focus.breakPeriod * 60;
    } else {
      focus.time = focus.workPeriod * 60;
    }

    focus.working = !focus.working;
    focus.active = false;

    updateFocus(dispatch, id,focus);
  }
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
        dispatch({ 
          type: UPDATE_FOCUS, 
          id: doc.id, 
          focus: {...doc.data(), category: newName }
        });
      })
    }).catch(error => {
      console.error(error);
    });
  });
};