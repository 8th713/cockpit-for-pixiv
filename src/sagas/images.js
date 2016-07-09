import { call, put, select } from 'redux-saga/effects'
import { takeBuffer } from './helpers'
import * as api from '../utils/api'
import { set as setError } from '../reducers/error'
import { fetch, update } from '../reducers/images'

function normalize(image) {
  const { src, naturalWidth: width, naturalHeight: height } = image

  return { src, width, height }
}

function* fetchImage(url) {
  try {
    const image = yield call(api.fetchImage, url)
    yield put(update(url, normalize(image)))
  } catch (err) {
    yield put(setError(err))
  }
}

function* loadImage({ payload }) {
  const url = payload
  const { images } = yield select()
  if (images[url] && !images[url].width) {
    yield call(fetchImage, url)
  }
}

export default function* imagesSaga() {
  yield* takeBuffer(fetch.getType(), loadImage)
}
