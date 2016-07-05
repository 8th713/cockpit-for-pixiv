import { createReducer } from 'redux-act'
import { createCreator } from './helpers'

const createAction = createCreator('toolbar')

export const open = createAction('open')
export const close = createAction('close')
export const closeAsnyc = createAction('closeAsnyc')

export default createReducer({
  [open]: () => true,
  [close]: () => false
}, false)
