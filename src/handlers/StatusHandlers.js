import { db, auth } from "../config/fbConfig";
import { Alert } from 'react-native';
import { displayTime } from "../utils";
import { 
  SET_APP_STATE, 
  SET_TIME_INACTIVE,
  INC_TRACKED, 
  DEC_TRACKED,
  SET_TRACKED,
} from "../constants/Status";
import { 
  EXPERIENCE_PER_SECOND, 
  UPDATE_FOCUS
} from "../constants/Focuses";
import { 
  UPDATE_UNTRACKED 
} from "../constants/Stats";

export function updateUntracked(dispatch, elapsed) {
  if (elapsed < 30) {
    return;
  }

  const statsRef = db.collection('stats').doc(auth.currentUser.uid);

  db.runTransaction(transaction => {
    return transaction.get(statsRef).then(doc => {
      const newUntracked = Math.floor(doc.data().untracked + elapsed);

      transaction.update(statsRef, { untracked: newUntracked });
    });
  }).then(() => {
    dispatch({ type: UPDATE_UNTRACKED, elapsed });
  }).catch(error => {
    console.error(error);
  });
};

function updateExperience(dispatch, elapsed, snapshot) {
  const batch = db.batch();

  let focuses = {};
  let updateFields = {};

  snapshot.forEach(doc => {
    focuses[doc.id] = {...doc.data()};
    updateFields[doc.id] = {};

    const deltaExp = EXPERIENCE_PER_SECOND * elapsed;

    updateFields[doc.id].level = focuses[doc.id].level;
    updateFields[doc.id].experience = focuses[doc.id].experience + deltaExp;

    while (updateFields[doc.id].experience >= 100) {
      updateFields[doc.id].level += 1;
      updateFields[doc.id].experience -= 100;
    }

    batch.update(db.collection('focuses').doc(doc.id), updateFields[doc.id]);
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
      const elapsed = (Date.now() - timeInactive) / 1000;

      const batch = db.batch();

      let activeFocusNames = ''; 
      snapshot.forEach(doc => {
        activeFocusNames += doc.get('name') + '\n';

        const focusRef = db.collection('focuses').doc(doc.id);
        batch.update(focusRef, { active: false });
      });

      batch.commit().then(() => {
        setTimeInactive(dispatch, Date.now());
        dispatch({ type: SET_TRACKED, tracked: 0 });

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
      message += `been active for ${displayTime(elapsed)}.\n`; 
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
            onPress: () => updateUntracked(dispatch, elapsed) 
          },
          { 
            text: 'Confirm', 
            onPress: () => updateExperience(dispatch, elapsed, snapshot) 
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

export function incTracked(dispatch, status) {
  if (status.tracked === 0) {
    const newUntracked = (Date.now() - status.timeInactive) / 1000;

    updateUntracked(dispatch, Math.floor(newUntracked));
  }

  dispatch({ type: INC_TRACKED });
};

export function decTracked(dispatch, status) {
  if (status.tracked === 1) {
    setTimeInactive(dispatch);
  }

  dispatch({ type: DEC_TRACKED });
};