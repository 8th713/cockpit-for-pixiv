import { createReducer } from 'redux-act'
import { createCreator } from './helpers'
import timm from '../utils/timm'
import { add } from './illusts'

const createAction = createCreator('images')

export const fetch = createAction('fetch')
export const update = createAction('update', (url, image) => ({ url, image }))

export default createReducer({
  [add]: (state, { images }) => timm.merge(state, images),
  [update]: (state, { url, image }) => timm.mergeIn(state, [url], image)
}, {})
