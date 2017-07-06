import { call, select, takeEvery } from 'redux-saga/effects'
import { share } from '../reducers/illusts'

function popup(url, width = 700, height = 472) {
  const center = {
    x: screen.width / 2,
    y: screen.height / 2
  }
  const left = Math.round(center.x - width / 2)
  let top = Math.round(center.y - height / 2) - 40
  top = top < 0 ? 0 : top
  const opts = `left=${left},top=${top},width=${width},height=${height}`
  return window.open(url, '', opts)
}

function* tweet() {
  const { current, illusts } = yield select()
  const { id } = current
  const illust = illusts[id]

  if (!illust) { return }

  const { illustTitle, userName } = illust
  const pixiv = new URL('http://www.pixiv.net/member_illust.php')
  pixiv.searchParams.set('mode', 'medium')
  pixiv.searchParams.set('illust_id', id)
  const twitter = new URL('https://twitter.com/intent/tweet')
  twitter.searchParams.set('text', `${illustTitle} | ${userName} #pixiv`)
  twitter.searchParams.set('url', pixiv.toString())

  yield call(popup, twitter.toString())
}

export default function* tweetSaga() {
  yield takeEvery(share.getType(), tweet)
}
