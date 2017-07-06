import { call, put, select, all, takeEvery } from 'redux-saga/effects'
import * as api from '../utils/api'
import { set as setError } from '../reducers/error'
import { fetch, set } from '../reducers/bookmark'
import { bookmark, update } from '../reducers/illusts'

function extract(doc) {
  const body = doc.querySelector('.layout-body')
  const frag = document.createDocumentFragment()
  for (const el of [...body.children]) {
    frag.appendChild(document.adoptNode(el))
  }
  return frag
}

function* handleGet() {
  const { current } = yield select()

  if (!current.id) { return }
  try {
    const doc = yield call(api.fetchForm, current.id)
    const form = yield call(extract, doc)
    yield put(set(form))
  } catch (err) {
    yield put(setError(err))
  }
}

function* handlePost({ payload }) {
  const { current } = yield select()

  if (!current.id) { return }
  try {
    const { id } = current
    const result = yield call(api.bookmark, id, payload)
    api.validate(result)
    yield put(update([id, 'isBookmarked'], true))
  } catch (err) {
    yield put(setError(err))
  }
}

export default function* bookmarkSaga() {
  yield all([
    takeEvery(fetch.getType(), handleGet),
    takeEvery(bookmark.getType(), handlePost)
  ])
}
