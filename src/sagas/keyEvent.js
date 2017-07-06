import { eventChannel } from 'redux-saga'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { listeners } from '../keyActions'

const ignored = ['INPUT', 'TEXTAREA', 'SELECT']

function keyEvent(target, keys) {
  return eventChannel((emit) => {
    const listener = (event) => {
      if (ignored.includes(event.target.nodeName)) {
        return
      }

      for (const key of keys) {
        if (key.test(event)) {
          emit(key)
        }
      }
    }

    target.addEventListener('keypress', listener)
    target.addEventListener('keydown', listener)
    target.addEventListener('keyup', listener)
    return () => {
      target.removeEventListener('keypress', listener)
      target.removeEventListener('keydown', listener)
      target.removeEventListener('keyup', listener)
    }
  })
}

function* handleKeyAction(key) {
  const state = yield select()
  const action = yield call(key.action, state)

  if (action) {
    yield put(action)
  }
}

export default function* keyEventSaga() {
  const channel = yield call(keyEvent, window, listeners)

  yield takeEvery(channel, handleKeyAction)
}
