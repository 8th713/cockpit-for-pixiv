import { takeEvery, eventChannel } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { listeners } from '../keyActions'

function keyEvent(target, keys) {
  return eventChannel((emit) => {
    const listener = () => {
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

  yield* takeEvery(channel, handleKeyAction)
}
