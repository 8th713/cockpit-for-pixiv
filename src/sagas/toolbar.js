import { delay } from 'redux-saga'
import { race, call, take, put, takeEvery } from 'redux-saga/effects'
import { open, close, closeAsnyc } from '../reducers/toolbar'

function* handleClose() {
  const { cancel } = yield race({
    delayed: call(delay, 300),
    cancel: take(open.getType())
  })

  if (!cancel) {
    yield put(close())
  }
}

export default function* toolbarSaga() {
  yield* takeEvery(closeAsnyc.getType(), handleClose)
}
