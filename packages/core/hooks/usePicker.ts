import { useMemo, useEffect, MouseEvent as RMouseEvent } from 'react'
import { useStateRef } from './useStateRef'
import { NO_SCROLLBAR, INCLUDES, EXCLUDES } from '../constants'

export function usePicker() {
  const node = useStateRef<HTMLAnchorElement | null>(null)
  const value = node.value ? getId(node.value) : null
  const actions = useMemo(() => {
    function go(n: number) {
      const element = node.value

      if (!element) return
      node.update(getSibling(element, n))
    }
    function goNext() {
      go(1)
    }
    function goPrev() {
      go(-1)
    }
    function goFromEvent(event: RMouseEvent) {
      event.stopPropagation()
      event.shiftKey ? goPrev() : goNext()
    }
    function unsetElement() {
      node.update(null)
    }

    return { goNext, goPrev, goFromEvent, unsetElement }
  }, [])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = ensureAnchorElement(event.target as Element)

      if (target && isIllustThumbnailAnchorElement(target)) {
        event.preventDefault()
        node.update(target)
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

    if (node.value) {
      html.classList.add(NO_SCROLLBAR)
      html.scrollTop = getScrollPosition(node.value)
    } else {
      html.classList.remove(NO_SCROLLBAR)
    }
  }, [node.value])

  return { value, actions }
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
