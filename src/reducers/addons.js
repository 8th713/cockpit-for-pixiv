import { handleActions } from 'redux-actions'
import timm from '../utils/timm'

export const post = (id, payload) => {
  self.postMessage({ id, payload }, location.origin)
}

export default handleActions({
  register: (state, { payload }) => timm.merge(state, payload)
}, {})
