import { takeEvery, delay } from 'redux-saga'
import { race, call, take, put } from 'redux-saga/effects'
import { set, reset } from '../reducers/error'

function* handleSet() {
  const { cancel } = yield race({
    delayed: call(delay, 60 * 1000),
    cancel: take(reset.getType())
  })
  if (!cancel) {
    yield put(reset())
  }
}

export default function* errorSaga() {
  yield takeEvery(set.getType(), handleSet)
}
