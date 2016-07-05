import { createReducer } from 'redux-act'
import { createCreator } from './helpers'
import timm from '../utils/timm'

const createAction = createCreator('illusts')

export const add = createAction('add',
  (id, illust, images) => ({ id, illust, images }))
export const update = createAction('update',
  (path, value) => ({ path, value })
)

export const bookmark = createAction('bookmark')
export const rate = createAction('rate')

export const keys = [
  { description: '評価[10点]', keys: ['l'], action: () => rate() }
]

export default createReducer({
  [add]: (state, { id, illust }) => timm.set(state, id, illust),
  [update]: (state, { path, value }) => timm.setIn(state, path, value)
}, {})
