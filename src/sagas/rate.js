import { call, put, select, takeEvery } from 'redux-saga/effects'
import * as api from '../utils/api'
import { set as setError } from '../reducers/error'
import { rate, update } from '../reducers/illusts'

function* handlePost() {
  const { current } = yield select()

  if (!current.id) { return }
  try {
    const { id } = current
    const result = yield call(api.voteTo, id)
    api.validate(result)
    yield put(update([id, 'isRated'], true))
  } catch (err) {
    yield put(setError(err))
  }
}

export default function* rateSaga() {
  yield takeEvery(rate.getType(), handlePost)
}
