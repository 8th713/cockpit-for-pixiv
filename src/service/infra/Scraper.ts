import { BookmarkAttrs } from '../../store'

const FORM = '.bookmark-detail-unit form:not(.remove-bookmark-form)'

export class Scraper {
  scrapeBookmarkPage(doc: Document): BookmarkAttrs {
    const res = {} as any
    const arr = jQuery(FORM, doc).serializeArray()

    for (const { name, value } of arr) {
      if (name === 'comment') {
        res.comment = value
      } else if (name === 'tag') {
        res.tags = value
      } else if (name === 'restrict') {
        res.restrict = Number(value)
      }
    }
    return res
  }
}
