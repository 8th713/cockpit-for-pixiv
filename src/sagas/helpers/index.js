import { take, actionChannel, call } from 'redux-saga/effects'

export function* takeBuffer(pattern, saga, ...args) {
  const chan = yield actionChannel(pattern)

  while (true) { // eslint-disable-line no-constant-condition
    const action = yield take(chan)
    yield call(saga, ...args.concat(action))
  }
}
