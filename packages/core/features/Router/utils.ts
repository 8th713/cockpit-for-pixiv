const NO_SCROLLBAR = 'no-scrollbar'

declare namespace self {
  var CP_SELECTORS: {
    INCLUDES: string[]
    EXCLUDES: string[]
  }
}

if (__DEV__) {
  self.CP_SELECTORS = {
    INCLUDES: [
      'a[href*="/artworks/"]',
      'a[href*="member_illust.php"][href*="mode=medium"][href*="illust_id="]',
    ],
    EXCLUDES: [
      '._one-click-bookmark',
      '.thumbnail-menu',
      '.thumbnail-menu *',
      '._history-item.show-detail',
    ],
  }
}

const INCLUDES = CP_SELECTORS.INCLUDES.join()
const EXCLUDES = CP_SELECTORS.EXCLUDES.join()

export const getId = (element: HTMLAnchorElement) => {
  // /member_illust.php?illust_id=:id
  if (element.pathname === '/member_illust.php')
    return new URLSearchParams(element.search).get('illust_id')!
  // /artworks/:id
  return element.pathname.split('/')[2]
}

export const ensureAnchorElement = (element: Element) => {
  if (element.matches(EXCLUDES)) return null

  return element.closest<HTMLAnchorElement>(INCLUDES)
}

export const hasThumbnail = (element: HTMLAnchorElement) =>
  element.outerHTML.includes('i.pximg.net') && !!getId(element)

export const getSibling = (element: Element, n: number) => {
  const anchors = document.querySelectorAll<HTMLAnchorElement>(INCLUDES)
  const targets = Array.from(anchors).filter(hasThumbnail)
  const currentIdx = targets.indexOf(element as any)
  const nextIdx = (targets.length + currentIdx + n) % targets.length

  return targets[nextIdx] || null
}

export const toggleWindowScrollBar = (force?: boolean) => {
  const html = document.documentElement!

  html.classList.toggle(NO_SCROLLBAR, force)
}
