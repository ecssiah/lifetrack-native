import { db, auth } from "../config/fbConfig";
import { Alert } from 'react-native';
import { displayTime, err } from "../utils";
import { updateUntracked } from "./StatsHandlers";
import { 
  UPDATE_STATUS,
} from "../constants/Status";
import { 
  EXPERIENCE_PER_SECOND, 
  UPDATE_FOCUS
} from "../constants/Focuses";
import { updateFocus } from "./FocusesHandlers";

function searchForActiveFocuses(dispatch, timeInactive) {
  let query = db.collection('focuses');
  query = query.where('userId', '==', auth.currentUser.uid);
  query = query.where('active', '==', true);
  query = query.where('working', '==', true);

  query.get().then(querySnapshot => {
    const elapsed = (Date.now() - timeInactive) / 1000;

    if (querySnapshot.empty) {
      updateUntracked(dispatch, elapsed);
      return;
    }

    // TODO: Convert to transactions
    const batch = db.batch();

    let activeFocusNames = ''; 
    querySnapshot.forEach(docSnapshot => {
      activeFocusNames += docSnapshot.get('name') + '\n';

      const focusRef = db.collection('focuses').doc(docSnapshot.id);
      batch.update(focusRef, { active: false });
    });

    batch.commit().then(() => {
      dispatch({ type: UPDATE_STATUS, update: { tracked: 0 } });

      querySnapshot.forEach(docSnapshot => {
        clearInterval(docSnapshot.data().timer);
        updateFocus(dispatch, docSnapshot.id, { active: false });
      });
    }).catch(err);

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
          onPress: () => updateExperience(dispatch, elapsed, querySnapshot) 
        },
      ],
    )
  }).catch(err);
};

export function activateApp(dispatch) {
  db.collection('stats').doc(auth.currentUser.uid).get().then(docSnapshot => {
    searchForActiveFocuses(dispatch, docSnapshot.data().timeInactive);
  }).catch(err);
};

function updateExperience(dispatch, elapsed, querySnapshot) {
  const batch = db.batch();

  let update = {};
  let focuses = {};

  querySnapshot.forEach(docSnapshot => {
    const docId = docSnapshot.id;

    update[docId] = {};
    focuses[docId] = {...docSnapshot.data()};

    const deltaExp = EXPERIENCE_PER_SECOND * elapsed;

    update[docId].level = focuses[docId].level;
    update[docId].experience = focuses[docId].experience + deltaExp;

    while (update[docId].experience >= 100) {
      update[docId].level += 1;
      update[docId].experience -= 100;
    }

    batch.update(db.collection('focuses').doc(docId), update[docId]);
  });

  batch.commit().then(() => {
    for (const id in update) {
      dispatch({ type: UPDATE_FOCUS, id, update: update[id] });
    }
  }).catch(err);
};
