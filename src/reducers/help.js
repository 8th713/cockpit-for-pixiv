import { createReducer } from 'redux-act'
import { createCreator } from './helpers'

const createAction = createCreator('help')

export const close = createAction('close')
export const toggle = createAction('toggle')

export const keys = [
  { description: 'ヘルプの表示/非表示', keys: ['?'], action: () => toggle() }
]

export default createReducer({
  [close]: () => false,
  [toggle]: (state) => !state
}, false)
