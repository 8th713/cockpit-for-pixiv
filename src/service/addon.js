// @flow
import {toJS} from 'mobx'

export class Addon {
  post<T>(action: string, node: T) {
    const src = toJS(node, false)
    const data = {action, src}

    window.postMessage(data, window.location.origin)
  }
}

export default new Addon()
