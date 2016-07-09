import { compose } from 'redux'
import { call } from 'redux-saga/effects'
import * as api from '../../utils/api'

const get = (selector) => (doc) => doc.querySelector(selector)
const prop = (key) => (el) => el && el[key]

const getText = prop('textContent')
const getHtml = prop('innerHTML')
const getHref = prop('href')
const getTags = (...nodes) => nodes.map((tag) => ({
  text: getText(tag),
  url: getHref(tag)
}))
const getCaption = compose(getHtml, get('.work-info .caption'))
const getDate = compose(getText, get('.meta li:first-child'))

export default function* fetchAdditionalData(id) {
  const doc = yield call(api.fetchPage, id)
  const tags = getTags(...doc.querySelectorAll('.tag .text'))
  const caption = getCaption(doc)
  const date = getDate(doc)

  return { tags, caption, date }
}
