import { injectGlobal } from 'styled-components'
import { PageService } from '../types'

const workList = [
  // old style
  '._work',
  // new style
  '.bBzsEVG',
  // /howto
  '.JXPrM4l',
  // /showcase
  '._2FLw4Mz',
  // /discovery/users
  '._2xIM_r7',
  // /contest
  '._work-modal-target:not(.title)',
  // /history.php
  '._history-item.show-detail'
]

const WORK = workList.join()
const NO_SCROLLBAR = 'no-scrollbar'

export class DOMPageService implements PageService {
  findThumbnail(element: HTMLAnchorElement, step: 1 | -1) {
    const list = Array.from(document.querySelectorAll(WORK))
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

  injectGlobalCSS() {
    injectGlobal`
      html.${NO_SCROLLBAR} {
        overflow: hidden;
        scroll-behavior: smooth;

        & iframe,
        & embed {
          visibility: hidden;
        }
      }

      ${WORK} {
        &[href*='illust_id'] {
          cursor: zoom-in;
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
      const target = (event.target as HTMLElement).closest(WORK)

      if (target && this.getId(target as HTMLAnchorElement)) {
        event.preventDefault()
        listener(target as HTMLAnchorElement)
      }
    })
  }
}
