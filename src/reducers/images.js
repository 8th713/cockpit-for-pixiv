import { handleActions } from 'redux-actions'
import { createCreator } from './helpers'
import timm from '../utils/timm'
import { add } from './illusts'

const createAction = createCreator('images')

export const fetch = createAction('fetch')
export const update = createAction('update', (url, image) => ({ url, image }))

export default handleActions({
  [add]: (state, { payload }) => timm.merge(state, payload.images),
  [update]: (state, { payload }) => timm.mergeIn(state, [payload.url], payload.image)
}, {})
