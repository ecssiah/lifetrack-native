import { db, auth } from "../config/fbConfig";
import { Alert } from 'react-native';
import { 
  SET_APP_STATE, 
  SET_TIME_INACTIVE 
} from "../constants/Status";
import { 
  EXPERIENCE_PER_SECOND, 
  UPDATE_FOCUS
} from "../constants/Focuses";
import { 
  DEC_TRACKED, 
  UPDATE_UNTRACKED 
} from "../constants/Stats";
import { displayTime } from "../utils";

export function updateUntracked(dispatch, timeElapsed) {
  const statsRef = db.collection('stats').doc(auth.currentUser.uid);

  db.runTransaction(transaction => {
    return transaction.get(statsRef).then(doc => {
      const newUntracked = Math.floor(doc.data().untracked + timeElapsed);

      transaction.update(statsRef, { untracked: newUntracked });
    });
  }).then(() => {
    dispatch({ type: UPDATE_UNTRACKED, elapsed: timeElapsed });

    console.warn('Untracked update transaction successful');
  }).catch(error => {
    console.error(error);
  });
};

function updateExperience(dispatch, timeElapsed, snapshot) {
  const batch = db.batch();

  let focuses = {};
  let updateFields = {};

  snapshot.forEach(doc => {
    focuses[doc.id] = {...doc.data()};
    updateFields[doc.id] = {};

    const deltaExp = EXPERIENCE_PER_SECOND * timeElapsed;

    updateFields[doc.id].level = focuses[doc.id].level;
    updateFields[doc.id].experience = focuses[doc.id].experience + deltaExp;

    while (updateFields[doc.id].experience >= 100) {
      updateFields[doc.id].level += 1;
      updateFields[doc.id].experience -= 100;
    }

    batch.update(db.collection('focuses').doc(doc.id), updateFields);

    dispatch({ type: DEC_TRACKED });
  });

  batch.commit().then(() => {
    for (const id in updateFields) {
      dispatch({ type: UPDATE_FOCUS, id, updateFields: updateFields[id] });
    }
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
        activeFocusNames += doc.get('name') + '\n';

        const focusRef = db.collection('focuses').doc(doc.id);
        batch.update(focusRef, { active: false });
      });

      batch.commit().then(() => {
        snapshot.forEach(doc => {
          clearInterval(doc.get('timer'));

          dispatch({ 
            type: UPDATE_FOCUS, 
            id: doc.id, 
            updateFields: { active: false }}
          );
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
          { 
            text: 'Cancel', 
            onPress: () => updateUntracked(dispatch, timeElapsed) 
          },
          { 
            text: 'Confirm', 
            onPress: () => updateExperience(dispatch, timeElapsed, snapshot) 
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