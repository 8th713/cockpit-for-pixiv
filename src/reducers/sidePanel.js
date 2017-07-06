import { handleActions } from 'redux-actions'
import { createCreator, presist } from './helpers'

const createAction = createCreator('sidePanel')

export const toggle = createAction('toggle')

export const keys = [
  { description: 'サイドパネルの表示/非表示', keys: ['t'], action: () => toggle() }
]

export default presist('cockpit/sidePanel', handleActions({
  [toggle]: (state) => !state
}, true), true)
