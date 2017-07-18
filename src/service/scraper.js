// @flow
/*global jQuery */

const DATE = '.meta > li:first-child'
const VIEW_COUNT = '.view-count'
const RATE_COUNT = '.rated-count'
const CAPTION = '.work-info .caption'
const TAG = '.tag .text'

const FORM = '.bookmark-detail-unit form:not(.remove-bookmark-form)'

export class Scraper {
  scrapeIllustPage(doc: Document): DetailSource {
    const $doc = jQuery(doc)
    const date = $doc.find(DATE).text()
    const viewCount = Number($doc.find(VIEW_COUNT).text())
    const rateCount = Number($doc.find(RATE_COUNT).text())
    const caption = $doc.find(CAPTION).html()
    const tagElements: HTMLAnchorElement[] = $doc.find(TAG).toArray()
    const tags = tagElements.map(el => ({
      name: el.textContent,
      url: el.href,
    }))

    return {date, viewCount, rateCount, caption, tags}
  }

  scrapeBookmarkPage(doc: Document): BookmarkSource {
    const res = {}
    const arr = jQuery(FORM, doc).serializeArray()

    for (const el of arr) {
      if (el.name === 'comment') {
        res.comment = el.value
      } else if (el.name === 'tag') {
        res.tags = el.value
      } else if (el.name === 'restrict') {
        res.restrict = Number(el.value)
      }
    }
    return res
  }
}

export default new Scraper()
