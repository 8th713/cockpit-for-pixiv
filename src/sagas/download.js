import { takeEvery } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { set as setError } from '../reducers/error'
import { download } from '../reducers/illusts'
import { post } from '../reducers/addons'

function* handleDownload() {
  const { current, illusts, images, addons } = yield select()
  const { id } = current
  const illust = illusts[id]

  if (!illust) { return }
  if (addons.download) {
    const data = Object.assign({}, illust)
    if (illust.images) {
      data.images = data.images.map((key) => images[key])
    }
    yield call(post, addons.download, data)
  } else {
    yield put(setError(new Error('ダウンロードアドオンが見つかりません')))
  }
}

export default function* downloadSaga() {
  yield takeEvery(download.getType(), handleDownload)
}
