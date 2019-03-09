import { all } from 'redux-saga/effects';
import { watchFocusesRequest } from './FocusesSagas';

export default function* rootSaga() {
  yield all([
    watchFocusesRequest(),
  ]);
};
