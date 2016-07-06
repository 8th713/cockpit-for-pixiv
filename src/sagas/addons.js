import { takeEvery, eventChannel } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

function onMessage() {
  return eventChannel((emit) => {
    window.addEventListener('message', (event) => {
      if (event.origin !== location.origin) { return }
      const action = event.data
      if (action.type) {
        emit(action)
      }
    })
  })
}

function* handleMessage(action) {
  yield put(action)
}

export default function* addonsSaga() {
  const channel = yield call(onMessage)

  yield* takeEvery(channel, handleMessage)
}
