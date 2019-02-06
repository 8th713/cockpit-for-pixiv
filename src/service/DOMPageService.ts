import { injectGlobal } from 'styled-components'
import { PageService } from '../types'

const NO_SCROLLBAR = 'no-scrollbar'
const THUMBNAIL_IMAGE_DOMAIN = 'i.pximg.net'
const ILLUST_ANCHOR_SELECTOR =
  'a[href*="member_illust.php?mode=medium&illust_id="]'

export class DOMPageService implements PageService {
  findThumbnail(element: HTMLAnchorElement, step: 1 | -1) {
    let list: Array<HTMLAnchorElement> = Array.from(
      document.querySelectorAll(ILLUST_ANCHOR_SELECTOR)
    )
    list = list.filter(element => {
      return this.isIllustThumbnailAnchorElement(element)
    })
    const currentIndex = list.indexOf(element)
    const nextIndex = (list.length + currentIndex + step) % list.length

    return list[nextIndex] as HTMLAnchorElement
  }

  getId(element: HTMLAnchorElement) {
    const params = new URLSearchParams(element.search)

    return params.get('illust_id') as string
  }

  buildResizeObserver(listener: (rect: ClientRect) => void) {
    return new ResizeObserver(entries => {
      listener(entries[0].contentRect)
    })
  }

  injectGlobal() {
    const script = document.head.appendChild(document.createElement('script'))

    script.src =
      'https://cdn.rawgit.com/FlandreDaisuki/zip_player/94b2a56/dist/zip_player.iife.js'

    this.addIllustThumbnailCursorChangeEvent()

    injectGlobal`
      html.${NO_SCROLLBAR} {
        overflow: hidden;
        scroll-behavior: smooth;

        & iframe,
        & embed {
          visibility: hidden;
        }
      }
    `
  }

  toggleScrollbar(force: boolean) {
    document.documentElement.classList.toggle(NO_SCROLLBAR, !force)
  }

  scrollWindow(target: HTMLAnchorElement) {
    const top = target.getBoundingClientRect().y + window.scrollY

    document.documentElement.scrollTop = ~~(top - window.innerHeight / 3)
  }

  onSelect(listener: (target: HTMLAnchorElement) => void) {
    document.body.addEventListener('click', (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('a')
      if (target && this.isIllustThumbnailAnchorElement(target)) {
        event.preventDefault()
        listener(target)
      }
    })
  }

  private addIllustThumbnailCursorChangeEvent() {
    document.body.addEventListener('mouseover', (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('a')
      if (!target || target.style.cursor === 'zoom-in') {
        return
      }

      if (this.isIllustThumbnailAnchorElement(target)) {
        target.style.cursor = 'zoom-in'
      }
    })
  }

  private isIllustThumbnailAnchorElement(element: HTMLAnchorElement) {
    if (!this.getId(element)) {
      return false
    }

    return (
      element.innerHTML.includes(THUMBNAIL_IMAGE_DOMAIN) ||
      (element.style.backgroundImage &&
        element.style.backgroundImage.includes(THUMBNAIL_IMAGE_DOMAIN))
    )
  }
}
