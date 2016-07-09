import { handleActions } from 'redux-actions'
import { createCreator } from './helpers'

const createAction = createCreator('bookmark')

export const fetch = createAction('fetch')
export const set = createAction('set')
export const reset = createAction('reset')

export const keys = [
  { description: 'ブックマーク', keys: ['b'], action: () => fetch() }
]

export default handleActions({
  [set]: (_, { payload }) => payload,
  [reset]: () => null
}, null)
