import { createCreator } from './helpers'

const createAction = createCreator('error')

export const set = createAction('set')
export const reset = createAction('reset')

export default function error(state = null, action) {
  if (action.error) {
    return action.payload
  }
  if (action.type === reset.getType()) {
    return null
  }
  return state
}
