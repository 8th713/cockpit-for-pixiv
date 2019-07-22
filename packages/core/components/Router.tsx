import React, { useContext, useEffect, useMemo, useState, useRef } from 'react'
import { EXCLUDES, INCLUDES, KEY_ASSIGNMENT, NO_SCROLLBAR } from '../constants'
import { Hotkey, Modal } from './shared'

type Props = {
  children: (id: string) => React.ReactNode
}

type Actions = {
  go: (n: number) => void
  goNext: () => void
  goPrev: () => void
  unset: () => void
  push: (id: string) => void
}

function getId(element: HTMLAnchorElement) {
  return new URLSearchParams(element.search).get('illust_id')
}

function ensureAnchorElement(element: Element) {
  if (element.matches(EXCLUDES)) return null

  return element.closest(INCLUDES) as HTMLAnchorElement | null
}

function isIllustThumbnailAnchorElement(
  element: Element
): element is HTMLAnchorElement {
  return (
    element instanceof HTMLAnchorElement &&
    element.outerHTML.includes('i.pximg.net') &&
    !!getId(element)
  )
}

function getSibling(element: Element, n: number) {
  const list = Array.from(document.querySelectorAll(INCLUDES)).filter(
    isIllustThumbnailAnchorElement
  )
  const currentIndex = list.indexOf(element as any)
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
const ValueContext = React.createContext<
  readonly [string | null, Actions] | typeof NO_PROVIDER
>(NO_PROVIDER)
const UpdateContext = React.createContext<Actions | typeof NO_PROVIDER>(
  NO_PROVIDER
)

export function useRoute() {
  const value = useContext(ValueContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  return value
}
export function useRouteId() {
  const value = useContext(ValueContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  if (value[0] === null) {
    throw new Error('Missing current id')
  }
  return value[0]
}
export function useRouteActions() {
  const value = useContext(UpdateContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  return value
}

export function Router({ children }: Props) {
  const latestElement = useRef<HTMLElement>()
  const [id, setId] = useState<string | null>(null)
  const actions = useMemo(() => {
    const setElement = (element: HTMLAnchorElement) => {
      latestElement.current = element
      setId(getId(element))
    }
    const go = (n: number) => {
      if (!latestElement.current) return
      const element = getSibling(latestElement.current, n)
      setElement(element)
    }
    const goNext = () => go(1)
    const goPrev = () => go(-1)
    const unset = () => {
      // Should update latestElement?
      setId(null)
    }
    const push = setId

    return { go, goNext, goPrev, unset, push, setElement }
  }, [])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = ensureAnchorElement(event.target as Element)

      if (!target) return
      if (!isIllustThumbnailAnchorElement(target)) return

      event.preventDefault()
      actions.setElement(target)
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
  }, [actions])

  useEffect(() => {
    const html = document.documentElement!

    if (id && latestElement.current) {
      html.classList.add(NO_SCROLLBAR)
      scrollIntoView(latestElement.current)
    } else {
      html.classList.remove(NO_SCROLLBAR)
    }
  }, [id])

  return (
    <UpdateContext.Provider value={actions}>
      <ValueContext.Provider value={[id, actions] as const}>
        <Modal open={!!id} onClose={actions.unset}>
          {id && children(id)}
        </Modal>
        <Hotkey {...KEY_ASSIGNMENT.goNextIllust} action={actions.goNext} />
        <Hotkey {...KEY_ASSIGNMENT.goPrevIllust} action={actions.goPrev} />
      </ValueContext.Provider>
    </UpdateContext.Provider>
  )
}
