import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Hotkey, Modal } from '../components'
import { EXCLUDES, INCLUDES, KEY_ASSIGNMENT, NO_SCROLLBAR } from '../constants'

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

const getId = (element: HTMLAnchorElement) =>
  new URLSearchParams(element.search).get('illust_id')

const ensureAnchorElement = (element: Element) => {
  if (element.matches(EXCLUDES)) return null

  return element.closest(INCLUDES) as HTMLAnchorElement | null
}

const isIllustThumbnailAnchorElement = (
  element: Element
): element is HTMLAnchorElement =>
  element instanceof HTMLAnchorElement &&
  element.outerHTML.includes('i.pximg.net') &&
  !!getId(element)

const getSibling = (element: Element, n: number) => {
  const list = Array.from(document.querySelectorAll(INCLUDES)).filter(
    isIllustThumbnailAnchorElement
  )
  const currentIndex = list.indexOf(element as any)
  const nextIndex = (list.length + currentIndex + n) % list.length

  return list[nextIndex] || null
}

const scrollIntoView = (element: HTMLElement) => {
  const html = document.documentElement
  const rect = element.getBoundingClientRect()
  const pageX = window.innerWidth / 2
  const pageY = window.innerHeight / 2
  const left = rect.left + window.scrollX - pageX
  const top = rect.top + window.scrollY - pageY
  html.scroll({ behavior: 'smooth', left, top })
}

const NO_PROVIDER = 'Missing Router'
const RouterValue = React.createContext<
  readonly [string | null, Actions] | typeof NO_PROVIDER
>(NO_PROVIDER)
const RouterActions = React.createContext<Actions | typeof NO_PROVIDER>(
  NO_PROVIDER
)
RouterValue.displayName = 'RouterValue'
RouterActions.displayName = 'RouterActions'

export const useRoute = () => {
  const value = useContext(RouterValue)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  return value
}
export const useRouteId = () => {
  const value = useRoute()
  if (value[0] === null) {
    throw new Error('Missing current id')
  }
  return value[0]
}
export const useRouteActions = () => {
  const value = useContext(RouterActions)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  return value
}
export const Router = ({ children }: Props) => {
  const latestElement = useRef<HTMLElement>()
  const [id, setId] = useState<string | null>(null)
  const open = !!id
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
    const handleClick = (event: MouseEvent) => {
      const target = ensureAnchorElement(event.target as Element)

      if (!target) return
      if (!isIllustThumbnailAnchorElement(target)) return

      event.preventDefault()
      actions.setElement(target)
    }
    const handleMouseOver = (event: MouseEvent) => {
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
    <RouterActions.Provider value={actions}>
      <RouterValue.Provider value={[id, actions] as const}>
        <Modal open={open} onClose={actions.unset}>
          {id && children(id)}
          <Hotkey {...KEY_ASSIGNMENT.goNextIllust} action={actions.goNext} />
          <Hotkey {...KEY_ASSIGNMENT.goPrevIllust} action={actions.goPrev} />
        </Modal>
      </RouterValue.Provider>
    </RouterActions.Provider>
  )
}
