import { eventChannel } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'
import { set } from '../reducers/viewSize'

function viewResize(target) {
  return eventChannel((emit) => {
    let timeout
    const listener = () => {
      clearTimeout(timeout)
      timeout = setTimeout(emit, 100, {})
    }
    target.addEventListener('resize', listener)
    return () => {
      target.removeEventListener('resize', listener)
    }
  })
}

function* handleRisize() {
  yield put(set({
    width: innerWidth,
    height: innerHeight
  }))
}

export default function* viewSizeSaga() {
  const channel = yield call(viewResize, window)

  yield* takeEvery(channel, handleRisize)
}
