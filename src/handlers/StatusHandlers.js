import { db, auth } from "../config/fbConfig";
import { Alert } from 'react-native';
import { displayTime, err, getElapsed } from "../utils";
import { UPDATE_STATUS } from "../constants/Status";
import { UPDATE_FOCUS } from "../constants/Focuses";
import { updateUntracked } from "./StatsHandlers";
import { updateExperience } from "./FocusesHandlers";

export async function activateApp(dispatch) {
  const doc = db.collection('stats').doc(auth.currentUser.uid);
  const docSnapshot = await doc.get().catch(err);

  searchForActiveFocuses(dispatch, docSnapshot.data().timeInactive);
};

async function searchForActiveFocuses(dispatch, timeInactive) {
  let query = db.collection('focuses');
  query = query.where('userId', '==', auth.currentUser.uid);
  query = query.where('active', '==', true);
  query = query.where('working', '==', true);

  const elapsed = getElapsed(timeInactive);

  const querySnapshot = await query.get().catch(err);

  if (querySnapshot.empty) {
    updateUntracked(dispatch, elapsed);
    return;
  }

  const batch = db.batch();

  querySnapshot.forEach(docSnapshot => {
    clearInterval(docSnapshot.data().timer);
    batch.update(docSnapshot.ref, { active: false });
  });

  await batch.commit().catch(err);
  
  dispatch({ type: UPDATE_STATUS, update: { tracked: 0 } });

  querySnapshot.forEach(docSnapshot => {
    dispatch({ 
      type: UPDATE_FOCUS, id: docSnapshot.id, update: { active: false }
    });
  });

  requestFocusUpdate(dispatch, elapsed, querySnapshot);
};

function requestFocusUpdate(dispatch, elapsed, querySnapshot) {
  const title = 'Update Focuses?';

  let message = '';
  message += 'These focuses have \n'
  message += `been active for ${displayTime(elapsed)}.\n`; 
  message += '\n';

  querySnapshot.forEach(docSnapshot => {
    message += docSnapshot.data().name + '\n'
  });

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
        onPress: () => updateExperience(dispatch, elapsed, querySnapshot) 
      },
    ],
  );
};