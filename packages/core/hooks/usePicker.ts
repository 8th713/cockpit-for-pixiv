import { useMemo, useEffect, MouseEvent as RMouseEvent } from 'react'
import { useStateRef } from './useStateRef'
import { NO_SCROLLBAR, WORK } from '../constants'

export function usePicker() {
  const [element, set, get] = useStateRef<HTMLAnchorElement | null>(null)
  const value = element ? getId(element) : null
  const actions = useMemo(() => {
    function go(n: number) {
      const element = get()
      if (!element) return
      set(getSibling(element, n))
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
      set(null)
    }

    return { goNext, goPrev, goFromEvent, unsetElement }
  }, [])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = (event.target as HTMLElement).closest(WORK)

      if (target && getId(target as HTMLAnchorElement)) {
        event.preventDefault()
        set(target as HTMLAnchorElement)
      }
    }

    document.body.addEventListener('click', handleClick)
    return () => document.body.removeEventListener('click', handleClick)
  }, [])

  useEffect(
    () => {
      const html = document.documentElement!

      if (element) {
        html.classList.add(NO_SCROLLBAR)
        html.scrollTop = getScrollPosition(element)
      } else {
        html.classList.remove(NO_SCROLLBAR)
      }
    },
    [element]
  )

  return { value, actions }
}

function getId(element: HTMLAnchorElement) {
  return new URLSearchParams(element.search).get('illust_id')!
}

function getSibling(element: HTMLAnchorElement, n: number) {
  const list = Array.from(document.querySelectorAll<HTMLAnchorElement>(WORK))
  const currentIndex = list.indexOf(element)
  const nextIndex = (list.length + currentIndex + n) % list.length

  return list[nextIndex] || null
}

function getScrollPosition(target: HTMLAnchorElement) {
  const rect = target.getBoundingClientRect() as DOMRect
  const top = rect.y + window.scrollY

  return ~~(top - window.innerHeight / 3)
}
