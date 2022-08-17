const NO_SCROLLBAR = 'no-scrollbar'
const INCLUDES = [
  'a[href*="/artworks/"]',
  'a[href*="member_illust.php"][href*="mode=medium"][href*="illust_id="]',
].join()
const EXCLUDES = [
  '._one-click-bookmark',
  '.thumbnail-menu',
  '.thumbnail-menu *',
  '._history-item.show-detail',
].join()

/**
 * 要素が CFP 対象要素であることを確認します
 */
export function ensureTargetElement(element: Element) {
  if (element.matches(EXCLUDES)) return null

  return element.closest<HTMLAnchorElement>(INCLUDES)
}

/**
 * 要素から illustId を返します
 */
export function getId(element: HTMLAnchorElement) {
  // match `/member_illust.php?illust_id=:id`
  if (element.pathname === '/member_illust.php')
    return new URLSearchParams(element.search).get('illust_id')!
  // match `/artworks/:id`
  return element.pathname.split('/')[2]
}

/**
 * 要素がサムネイルを含んでいるか
 */
export function hasThumbnail(element: HTMLAnchorElement) {
  return element.outerHTML.includes('i.pximg.net') && !!getId(element)
}

export function getSibling(element: HTMLAnchorElement, n: number) {
  const anchors = document.querySelectorAll<HTMLAnchorElement>(INCLUDES)
  const targets = Array.from(anchors).filter(hasThumbnail)
  const currentIdx = targets.indexOf(element)
  const nextIdx = (targets.length + currentIdx + n) % targets.length

  return targets[nextIdx] || null
}

export function toggleWindowScrollBar(force?: boolean) {
  document.documentElement.classList.toggle(NO_SCROLLBAR, force)
}
