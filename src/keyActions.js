import { keys as current } from './reducers/current'
import { keys as bookmark } from './reducers/bookmark'
import { keys as help } from './reducers/help'
import { keys as resize } from './reducers/resize'
import { keys as sidePanel } from './reducers/sidePanel'
import { keys as illusts } from './reducers/illusts'

class Key {
  constructor(key, type = 'keydown', repeat = false) {
    this.type = type
    this.repeat = repeat
    this.key = key
  }

  test(event) {
    const checkList = ['type', 'key', 'repeat']

    return checkList.every((prop) => this[prop] === event[prop])
  }
}

const keyActions = [
  ...current,
  ...bookmark,
  ...illusts,
  ...resize,
  ...sidePanel,
  ...help
]
const listeners = []

for (const { keys, action, type, repeat } of keyActions) {
  for (const key of keys) {
    const keyObj = new Key(key, type, repeat)

    keyObj.action = action
    listeners.push(keyObj)
  }
}

export { listeners }
export default keyActions
