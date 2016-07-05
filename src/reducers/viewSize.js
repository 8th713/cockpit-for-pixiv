import { createReducer } from 'redux-act'
import { createCreator } from './helpers'
import timm from '../utils/timm'

const createAction = createCreator('viewSize')

export const set = createAction('set')

export default createReducer({
  [set]: (state, size) => timm.merge(state, size)
}, { width: innerWidth, height: innerHeight })
