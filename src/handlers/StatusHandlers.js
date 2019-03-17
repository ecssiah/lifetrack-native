import { db, auth } from "../config/fbConfig";
import { Alert } from 'react-native';
import { 
  SET_APP_STATE, 
  SET_TIME_INACTIVE 
} from "../constants/Status";
import { 
  EXPERIENCE_PER_SECOND, 
  UPDATE_FOCUS_TIMER_FIELDS, 
  SET_FOCUS_ACTIVE
} from "../constants/Focuses";
import { displayTime } from "../utils";

function updateFocusExperience(dispatch, snapshot, timeElapsed) {
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
      { 
        level: focus.level, 
        experience: focus.experience 
      }
    );
  });

  batch.commit().then(() => {
    updatedFocuses.forEach(focus => {
      dispatch({ type: UPDATE_FOCUS_TIMER_FIELDS, id: focus.id, focus });
    });
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

      const batch = db.batch();

      let activeFocusNames = ''; 
      snapshot.forEach(doc => {
        const focusRef = db.collection('focuses').doc(doc.id);

        batch.update(focusRef, { active: false });

        return activeFocusNames += doc.get('name') + '\n';
      });

      batch.commit().then(() => {
        snapshot.forEach(doc => {
          dispatch({ type: SET_FOCUS_ACTIVE, id: doc.id, active: false });
        });
      }).catch(error => {
        console.error(error);
      });

      const title = 'Update Focuses?';

      let message = '';
      message += 'These focuses have \n'
      message += `been active for ${displayTime(timeElapsed)}.\n`; 
      message += '\n';
      message += activeFocusNames;
      message += '\n';
      message += 'Is this correct?';

      Alert.alert(
        title,
        message,
        [
          { text: 'Cancel', onPress: null },
          { 
            text: 'Confirm', 
            onPress: () => updateFocusExperience(dispatch, snapshot, timeElapsed) 
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