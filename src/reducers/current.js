import { createReducer } from 'redux-act'
import { createCreator } from './helpers'

const createAction = createCreator('current')

export const slide = createAction('slide')
export const set = createAction('set', (element, id) => ({ element, id }))
export const reset = createAction('reset')

export const keys = [
  { description: '次の作品', keys: ['j'], action: () => slide(1) },
  { description: '前の作品', keys: ['k'], action: () => slide(-1) }
]

export default createReducer({
  [set]: (_, payload) => payload,
  [reset]: () => ({})
}, {})
