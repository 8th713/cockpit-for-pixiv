import { fork } from 'redux-saga/effects'
import currentSaga from './current'
import illustsSaga from './illusts'
import imagesSaga from './images'
import toolbarSaga from './toolbar'
import bookmarkSaga from './bookmark'
import rateSaga from './rate'
import viewSizeSaga from './viewSize'
import keyEventSaga from './keyEvent'

export default function* rootSaga() {
  yield fork(currentSaga)
  yield fork(illustsSaga)
  yield fork(imagesSaga)
  yield fork(toolbarSaga)
  yield fork(bookmarkSaga)
  yield fork(rateSaga)
  yield fork(viewSizeSaga)
  yield fork(keyEventSaga)
}
