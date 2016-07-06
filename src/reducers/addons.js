import { createReducer } from 'redux-act'
import timm from '../utils/timm'

export const post = (id, payload) => {
  self.postMessage({ id, payload }, location.origin)
}

export default createReducer({
  register: (state, payload) => timm.merge(state, payload)
}, {})
