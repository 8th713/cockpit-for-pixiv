import { createReducer } from 'redux-act'
import { createCreator } from './helpers'

const createAction = createCreator('error')

export const set = createAction('set')
export const reset = createAction('reset')

export default createReducer({
  [set]: (_, state) => state,
  [reset]: () => null
}, null)
