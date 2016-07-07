import { handleActions } from 'redux-actions'
import { createCreator } from './helpers'
import timm from '../utils/timm'

const createAction = createCreator('viewSize')

export const set = createAction('set')

export default handleActions({
  [set]: (state, { payload }) => timm.merge(state, payload)
}, { width: innerWidth, height: innerHeight })
