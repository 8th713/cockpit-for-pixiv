import { handleActions } from 'redux-actions'
import { createCreator } from './helpers'

const createAction = createCreator('toolbar')

export const open = createAction('open')
export const close = createAction('close')
export const closeAsnyc = createAction('closeAsnyc')

export default handleActions({
  [open]: () => true,
  [close]: () => false
}, false)
