import { eventChannel } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

function onMessage() {
  return eventChannel((emit) => {
    const listener = (event) => {
      if (event.origin !== location.origin) { return }
      const action = event.data
      if (action.type) {
        emit(action)
      }
    }

    window.addEventListener('message', listener)
    return () => {
      window.removeEventListener('message', listener)
    }
  })
}

function* handleMessage(action) {
  yield put(action)
}

export default function* addonsSaga() {
  const channel = yield call(onMessage)

  yield takeEvery(channel, handleMessage)
}
