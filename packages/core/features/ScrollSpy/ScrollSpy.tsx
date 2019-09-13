import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import styled from 'styled-components'
import { Hotkey } from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { useFullSizeMode } from '../FullSizeView'
import { useIntersection, useIntersectionEffect } from '../IntersectionObserver'

type HostProps = {
  illustId: string
  children?: React.ReactNode
}
type ItemProps = {
  index: number
  children?: React.ReactNode
}
type LastItemProps = {
  children?: React.ReactNode
}
type State = {
  index: number
  inViewNode: Element | null
  isBottom: boolean
  lastNode: Element | null
}
type ScrollActions = {
  scrollPrev: () => void
  scrollNext: () => void
  scrollBottom: () => void
  setIndex: (index: number, inViewNode: Element) => void
  setIsBottom: (isBottom: boolean, lastNode: Element) => void
} & ReturnType<typeof useIntersection>
type Value = [State, ScrollActions]

const initialState: State = {
  index: 0,
  inViewNode: null,
  isBottom: false,
  lastNode: null
}
const ScrollSpyValue = React.createContext<Value | null>(null)
const ScrollSpyActions = React.createContext<ScrollActions | null>(null)
ScrollSpyValue.displayName = 'ScrollSpyValue'
ScrollSpyActions.displayName = 'ScrollSpyActions'

export const useScrollSpy = () => {
  const value = useContext(ScrollSpyValue)
  if (value === null) throw new Error('Missing ScrollSpy')
  return value
}
export const useScrollActions = () => {
  const value = useContext(ScrollSpyActions)
  if (value === null) throw new Error('Missing ScrollSpy')
  return value
}
export const ScrollSpy = ({ illustId, children }: HostProps) => {
  const observer = useIntersection()
  const [isFullSize, setFullSize] = useFullSizeMode()
  const [state, setState] = useState(initialState)
  const stateRef = useRef(state)
  const behaviorRef = useRef<'auto' | 'smooth'>(isFullSize ? 'auto' : 'smooth')
  const actions = useMemo(() => {
    const scrollPrev = () => {
      const { inViewNode, isBottom } = stateRef.current
      if (!inViewNode) return
      const behavior = behaviorRef.current
      if (isBottom) {
        inViewNode.scrollIntoView({ behavior })
      } else if (inViewNode.previousElementSibling) {
        inViewNode.previousElementSibling.scrollIntoView({ behavior })
      }
    }
    const scrollNext = () => {
      const { inViewNode, lastNode } = stateRef.current
      if (!inViewNode) return
      const behavior = behaviorRef.current
      const next = inViewNode.nextElementSibling
      if (next === lastNode) setFullSize(false)
      if (next) next.scrollIntoView({ behavior })
    }
    const scrollBottom = () => {
      const { lastNode } = stateRef.current
      if (!lastNode) return
      lastNode.scrollIntoView()
      setFullSize(false)
    }
    const setIndex = (index: number, inViewNode: Element) =>
      setState(state => {
        if (index === state.index && inViewNode === state.inViewNode)
          return state
        return { ...state, index, inViewNode }
      })
    const setIsBottom = (isBottom: boolean, lastNode: Element) =>
      setState(state => {
        if (isBottom === state.isBottom && lastNode === state.lastNode)
          return state
        return { ...state, isBottom, lastNode }
      })

    return {
      scrollPrev,
      scrollNext,
      scrollBottom,
      setIndex,
      setIsBottom,
      ...observer
    }
  }, [observer, setFullSize])

  useEffect(() => {
    stateRef.current = state
  }, [state])
  useEffect(() => {
    behaviorRef.current = isFullSize ? 'auto' : 'smooth'
  }, [isFullSize])
  useEffect(() => observer.start({ threshold: 0.5 }), [observer])
  useEffect(() => setState(initialState), [illustId])
  useEffect(() => {
    const handle = () => {
      const state = stateRef.current
      if (state.isBottom && state.lastNode) {
        state.lastNode.scrollIntoView()
      } else if (state.inViewNode) {
        state.inViewNode.scrollIntoView()
      }
    }

    window.addEventListener('resize', handle)
    return () => {
      window.removeEventListener('resize', handle)
    }
  }, [])

  return (
    <ScrollSpyActions.Provider value={actions}>
      <ScrollSpyValue.Provider value={[state, actions]}>
        {children}
        <Hotkey {...KEY_ASSIGNMENT.goPrevImage} action={actions.scrollPrev} />
        <Hotkey {...KEY_ASSIGNMENT.goNextImage} action={actions.scrollNext} />
        <Hotkey {...KEY_ASSIGNMENT.info} action={actions.scrollBottom} />
      </ScrollSpyValue.Provider>
    </ScrollSpyActions.Provider>
  )
}
export const SpyItem = ({ index, children }: ItemProps) => {
  const { setIndex, ...observer } = useScrollActions()
  const ref = useIntersectionEffect(
    observer,
    useCallback(
      entry => {
        if (entry.isIntersecting) {
          setIndex(index, entry.target)
        }
      },
      [index, setIndex]
    )
  )

  return <span ref={ref}>{children}</span>
}
export const SpyItemLast = ({ children }: LastItemProps) => {
  const { setIsBottom, ...observer } = useScrollActions()
  const ref = useIntersectionEffect(
    observer,
    useCallback(entry => setIsBottom(entry.isIntersecting, entry.target), [
      setIsBottom
    ])
  )

  return <Box ref={ref}>{children}</Box>
}

const Box = styled.div`
  position: relative;
  top: calc(1px + var(--caption-height));
  height: 1px;
`
