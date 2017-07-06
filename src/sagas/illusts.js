import { select, fork, call, put, all, takeEvery } from 'redux-saga/effects'
import fetchIllust from './sub/illust'
import fetchAdditionalData from './sub/additionalData'
import { add } from '../reducers/illusts'
import { set as setError } from '../reducers/error'
import { set as setCurrent } from '../reducers/current'

function* fetchAll(id) {
  try {
    const [[illust, images], additionalData] = yield all([
      call(fetchIllust, id),
      call(fetchAdditionalData, id)
    ])

    Object.assign(illust, additionalData)
    yield put(add(id, illust, images))
  } catch (err) {
    yield put(setError(err))
  }
}

function* loadIllust({ payload }) {
  const { id } = payload
  const { illusts } = yield select()
  if (illusts[id]) { return }
  yield fork(fetchAll, id)
}

export default function* illustsSaga() {
  yield takeEvery(setCurrent.getType(), loadIllust)
}
