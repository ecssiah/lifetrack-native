import { db, auth } from "../config/fbConfig";
import { Alert } from 'react-native';
import { 
  SET_APP_STATE, 
  SET_TIME_INACTIVE 
} from "../constants/Status";
import { 
  EXPERIENCE_PER_SECOND, 
  UPDATE_FOCUS_TIMER_FIELDS 
} from "../constants/Focuses";

function updateFocuses(dispatch, snapshot, timeElapsed) {
  const batch = db.batch();

  let updatedFocuses = [];

  snapshot.forEach(doc => {
    const focus = {id: doc.id, ...doc.data()};

    focus.experience += EXPERIENCE_PER_SECOND * timeElapsed;

    while (focus.experience >= 100) {
      focus.level++;
      focus.experience -= 100;
    }

    updatedFocuses.push(focus);

    const focusRef = db.collection('focuses').doc(doc.id);

    batch.update(
      focusRef, 
      { level: focus.level, experience: focus.experience }
    );
  });

  batch.commit().then(() => {
    updatedFocuses.forEach(focus => {
      dispatch({ type: UPDATE_FOCUS_TIMER_FIELDS, id: focus.id, focus });
    });

    console.warn('I DID IT!');
  }).catch(error => {
    console.error(error);
  });
};

export function activateApp(dispatch, timeInactive) {
  let query = db.collection('focuses');
  query = query.where('userId', '==', auth.currentUser.uid);
  query = query.where('active', '==', true);
  query = query.where('working', '==', true);

  query.get().then(snapshot => {
    if (!snapshot.empty) {
      const timeElapsed = (Date.now() - timeInactive) / 1000;

      let activeFocuses = ''; 
      snapshot.forEach(doc => activeFocuses += doc.get('name') + '\n');

      const title = 'Update Focuses?';

      let message = '';
      message += `These focuses have been active for ${timeElapsed} seconds:`; 
      message += '\n\n';
      message += activeFocuses;
      message += '\n';
      message += 'Is this correct?';

      Alert.alert(
        title,
        message,
        [
          { text: 'Cancel', onPress: null },
          { 
            text: 'Confirm', 
            onPress: () => updateFocuses(dispatch, snapshot, timeElapsed) 
          },
        ],
      )
    }
  }).catch(error => {
    console.error(error);
  });
};

export function setAppState(dispatch, appState) {
  dispatch({ type: SET_APP_STATE, appState });
};

export function setTimeInactive(dispatch) {
  dispatch({ type: SET_TIME_INACTIVE, timeInactive: Date.now() })
};