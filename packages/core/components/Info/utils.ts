export function like(illust: Pixiv.Illust): Pixiv.Illust {
  const likeCount = illust.likeCount + 1
  return { ...illust, likeCount, likeData: true }
}

export function bookmark(
  illust: Pixiv.Illust,
  restrict: boolean
): Pixiv.Illust {
  const bookmarkCount = illust.bookmarkData
    ? illust.bookmarkCount
    : illust.bookmarkCount + 1
  const bookmarkData = illust.bookmarkData
    ? illust.bookmarkData
    : { id: '', private: restrict }
  return { ...illust, bookmarkCount, bookmarkData }
}

const ANKER_TAG = /\<a href=".+?"/
const replaceFn = (comment: string) => {
  const doc = new DOMParser().parseFromString(comment, 'text/html')
  const links = doc.getElementsByTagName('a')
  for (const link of links) {
    if (link.pathname === '/jump.php') {
      link.href = unescape(link.search.slice(1))
      link.referrerPolicy = 'no-referrer'
    }
  }
  return doc.body.innerHTML
}
/**
 * replace /jump.php to direct
 * @param comment HTML string
 */
export const replaceJumpLink = (comment: string) => {
  return ANKER_TAG.test(comment) ? replaceFn(comment) : comment
}
