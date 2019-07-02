import React, { useContext, useEffect, useMemo, useState } from 'react'
import { EXCLUDES, INCLUDES, KEY_ASSIGNMENT, NO_SCROLLBAR } from '../constants'
import { Hotkey } from './shared/Hotkey'
import { Modal } from './shared/Modal'

type Props = {
  children: (id: string) => React.ReactNode
}

type Actions = {
  go: (n: number) => void
  goNext: () => void
  goPrev: () => void
  unset: () => void
}

function getId(element: HTMLAnchorElement) {
  return new URLSearchParams(element.search).get('illust_id')
}

function ensureAnchorElement(element: Element) {
  if (element.matches(EXCLUDES)) return null

  return element.closest(INCLUDES) as HTMLAnchorElement | null
}

function isIllustThumbnailAnchorElement(element: HTMLAnchorElement) {
  return element.outerHTML.includes('i.pximg.net') && !!getId(element)
}

function getSibling(element: HTMLAnchorElement, n: number) {
  const list = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(INCLUDES)
  ).filter(isIllustThumbnailAnchorElement)
  const currentIndex = list.indexOf(element)
  const nextIndex = (list.length + currentIndex + n) % list.length

  return list[nextIndex] || null
}

function scrollIntoView(element: HTMLElement) {
  const html = document.documentElement
  const rect = element.getBoundingClientRect()
  const pageX = window.innerWidth / 2
  const pageY = window.innerHeight / 2
  const left = rect.left + window.scrollX - pageX
  const top = rect.top + window.scrollY - pageY
  html.scroll({ behavior: 'smooth', left, top })
}

const NO_PROVIDER = 'Missing Router'
const UpdateContext = React.createContext<Actions | typeof NO_PROVIDER>(
  NO_PROVIDER
)

export function useRouteActions() {
  const value = useContext(UpdateContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  return value
}

export function Router({ children }: Props) {
  const [element, setElement] = useState<HTMLAnchorElement | null>(null)
  const id = element ? getId(element) : null
  const actions = useMemo(() => {
    const go = (n: number) => {
      setElement(current => {
        if (!current) return current

        return getSibling(current, n)
      })
    }
    const goNext = () => go(1)
    const goPrev = () => go(-1)
    const unset = () => setElement(null)

    return { go, goNext, goPrev, unset }
  }, [])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = ensureAnchorElement(event.target as Element)

      if (!target) return
      if (!isIllustThumbnailAnchorElement(target)) return

      event.preventDefault()
      setElement(target)
    }
    function handleMouseOver(event: MouseEvent) {
      const target = ensureAnchorElement(event.target as Element)

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
      scrollIntoView(element)
    } else {
      html.classList.remove(NO_SCROLLBAR)
    }
  }, [element])

  return (
    <UpdateContext.Provider value={actions}>
      <Modal open={!!id} onClose={actions.unset}>
        {id && children(id)}
      </Modal>
      <Hotkey {...KEY_ASSIGNMENT.goNextIllust} action={actions.goNext} />
      <Hotkey {...KEY_ASSIGNMENT.goPrevIllust} action={actions.goPrev} />
    </UpdateContext.Provider>
  )
}
