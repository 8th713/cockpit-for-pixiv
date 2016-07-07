import { handleActions } from 'redux-actions'
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
export const download = createAction('download')
export const share = createAction('share')

export const keys = [
  { description: '評価[10点]', keys: ['l'], action: () => rate() },
  { description: '画像をローカルに保存', keys: ['d'], action: () => download() },
  { description: 'Twitterでシェアする', keys: ['s'], action: () => share() }
]

export default handleActions({
  [add]: (state, { payload }) => timm.set(state, payload.id, payload.illust),
  [update]: (state, { payload }) => timm.setIn(state, payload.path, payload.value)
}, {})
