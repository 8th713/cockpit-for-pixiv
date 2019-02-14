import { useEffect, useState } from 'react'
import { EXCLUDES, INCLUDES, NO_SCROLLBAR } from '../constants'

export function usePicker() {
  const [element, setElement] = useState<HTMLAnchorElement | null>(null)
  const illustId = element ? getId(element) : null

  function go(n: number) {
    setElement(element => {
      if (!element) return element

      return getSibling(element, n)
    })
  }
  function goNext() {
    go(1)
  }
  function goPrev() {
    go(-1)
  }
  function goFromEvent(event: React.MouseEvent) {
    event.stopPropagation()
    event.shiftKey ? goPrev() : goNext()
  }
  function unsetElement() {
    setElement(null)
  }

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = ensureAnchorElement(event.target as Element)

      if (target && isIllustThumbnailAnchorElement(target)) {
        event.preventDefault()
        setElement(target)
      }
    }
    function handleMouseOver(event: MouseEvent) {
      const target = (event.target as HTMLElement).closest('a')

      if (!target) return
      if (target.style.cursor === 'zoom-in') return
      if (!isIllustThumbnailAnchorElement(target)) return

      target.style.cursor = 'zoom-in'
    }

    document.body.addEventListener('click', handleClick)
    document.body.addEventListener('mouseover', handleMouseOver)
    return () => {
      document.body.removeEventListener('click', handleClick)
      document.body.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  useEffect(() => {
    const html = document.documentElement!

    if (element) {
      html.classList.add(NO_SCROLLBAR)
      html.scrollTop = getScrollPosition(element)
    } else {
      html.classList.remove(NO_SCROLLBAR)
    }
  }, [element])

  return { illustId, actions: { goNext, goPrev, goFromEvent, unsetElement } }
}

function ensureAnchorElement(element: Element) {
  if (element.matches(EXCLUDES)) return null

  return element.closest(INCLUDES) as HTMLAnchorElement | null
}

function isIllustThumbnailAnchorElement(element: HTMLAnchorElement) {
  return element.outerHTML.includes('i.pximg.net') && !!getId(element)
}

function getId(element: HTMLAnchorElement) {
  return new URLSearchParams(element.search).get('illust_id')
}

function getSibling(element: HTMLAnchorElement, n: number) {
  const list = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(INCLUDES)
  ).filter(isIllustThumbnailAnchorElement)
  const currentIndex = list.indexOf(element)
  const nextIndex = (list.length + currentIndex + n) % list.length

  return list[nextIndex] || null
}

function getScrollPosition(target: HTMLAnchorElement) {
  const rect = target.getBoundingClientRect() as DOMRect
  const top = rect.y + window.scrollY

  return ~~(top - window.innerHeight / 3)
}
