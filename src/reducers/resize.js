import { createReducer } from 'redux-act'
import { createCreator, presist } from './helpers'

const createAction = createCreator('resize')

export const toggle = createAction('toggle')

export const keys = [
  { description: '画像のリサイズ', keys: ['r'], action: () => toggle() }
]

export default presist('cockpit/resize', createReducer({
  [toggle]: (state) => !state
}), true)
