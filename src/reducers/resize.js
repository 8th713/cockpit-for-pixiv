import { handleActions } from 'redux-actions'
import { createCreator, presist } from './helpers'

const createAction = createCreator('resize')

export const toggle = createAction('toggle')

export const keys = [
  { description: '画像のリサイズ', keys: ['v'], action: () => toggle() }
]

export default presist('cockpit/resize', handleActions({
  [toggle]: (state) => !state
}, true), true)
