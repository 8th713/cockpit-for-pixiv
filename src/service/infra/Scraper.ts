import { BookmarkAttrs } from '../../store'

const FORM = '.bookmark-detail-unit form:not(.remove-bookmark-form) input'

export class Scraper {
  scrapeBookmarkPage(doc: Document): BookmarkAttrs {
    const res = {} as any
    const elements: NodeListOf<HTMLInputElement> = doc.querySelectorAll(FORM);
    const arr = Array.from(elements);

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
