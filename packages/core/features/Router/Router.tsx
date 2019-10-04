import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Modal } from '../../components'
import { EXCLUDES, INCLUDES, NO_SCROLLBAR } from '../../constants'

type Props = {
  children: (id: string) => React.ReactNode
}

type Value = readonly [string | null, Actions]
type Actions = {
  go: (n: number) => void
  goNext: () => void
  goPrev: () => void
  unset: () => void
  push: (id: string) => void
}

const getId = (element: HTMLAnchorElement) => element.pathname.split('/')[2]

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

const RouterValue = React.createContext<Value | null>(null)
const RouterActions = React.createContext<Actions | null>(null)

export const useRoute = () => {
  const value = useContext(RouterValue)
  if (value === null) throw new Error('Missing Router')
  return value
}

export const useRouteId = () => {
  const [illustId] = useRoute()
  if (illustId === null) throw new Error('Missing current id')
  return illustId
}

export const useRouteActions = () => {
  const value = useContext(RouterActions)
  if (value === null) throw new Error('Missing Router')
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
        <Modal
          open={open}
          onClose={actions.unset}
          onBackdropClick={actions.unset}
        >
          {id && children(id)}
        </Modal>
      </RouterValue.Provider>
    </RouterActions.Provider>
  )
}

if (__DEV__) {
  RouterValue.displayName = 'RouterValue'
  RouterActions.displayName = 'RouterActions'
}
