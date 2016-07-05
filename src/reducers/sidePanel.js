import { createReducer } from 'redux-act'
import { createCreator, presist } from './helpers'

const createAction = createCreator('sidePanel')

export const toggle = createAction('toggle')

export const keys = [
  { description: 'サイドパネルの表示/非表示', keys: ['t'], action: () => toggle() }
]

export default presist('cockpit/sidePanel', createReducer({
  [toggle]: (state) => !state
}), true)
