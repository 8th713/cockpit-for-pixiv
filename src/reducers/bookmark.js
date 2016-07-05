import { createReducer } from 'redux-act'
import { createCreator } from './helpers'

const createAction = createCreator('bookmark')

export const fetch = createAction('fetch')
export const set = createAction('set')
export const reset = createAction('reset')

export const keys = [
  { description: 'ブックマーク', keys: ['b'], action: () => fetch() }
]

export default createReducer({
  [set]: (_, state) => state,
  [reset]: () => null
}, null)
