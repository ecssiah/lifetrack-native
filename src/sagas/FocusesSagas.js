import { takeEvery, takeLatest, put, call, all } from 'redux-saga/effects';
import { db, auth } from '../config';
import { 
  LOAD_FOCUSES_REQUEST, LOAD_FOCUSES_SUCCESS, LOAD_FOCUSES_FAIL 
} from '../constants/Focuses';

function* focusesRequest(action) {
  try {
    const focusesSnapshot = yield call(
      db.collection('focuses').where('userId', '==', auth.currentUser.uid).get
    );

    let focuses = {};
    focusesSnapshot.forEach(doc => {
      focuses[doc.id] = {
        id: doc.get('id'),
        userId: doc.get('userId'),
        name: doc.get('name'),
        category: doc.get('category'),
        time: doc.get('time'),
        periods: doc.get('periods'),
        level: doc.get('level'),
        workPeriod: doc.get('workPeriod'),
        workGoal: doc.get('workGoal'),
        breakPeriod: doc.get('breakPeriod'),
        experience: doc.get('experience'),
        working: doc.get('working'),
        timerActive: doc.get('timerActive'),
        timer: doc.get('timer'),
      };
    });

    yield put({ type: LOAD_FOCUSES_SUCCESS, focuses });
  } catch (error) {
    yield put({ type: LOAD_FOCUSES_FAIL, error });
  }
};

export function* watchFocusesRequest() {
  yield takeLatest(LOAD_FOCUSES_REQUEST, focusesRequest);  
};