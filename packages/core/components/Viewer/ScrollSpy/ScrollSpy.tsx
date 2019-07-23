import React, {
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import {
  useIntersection,
  useIntersectionEffect
} from '../../../hooks/useIntersection'
import { Hotkey } from '../../shared'
import { useFullSizeMode } from '../FullSizeMode'
import { OverLay } from './OverLay'
import styled from 'styled-components'

type HostProps = {
  id: string
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

const NO_PROVIDER = 'Missing ScrollSpy'
const ValueContext = React.createContext<Value | typeof NO_PROVIDER>(
  NO_PROVIDER
)
const UpdateContext = React.createContext<ScrollActions | typeof NO_PROVIDER>(
  NO_PROVIDER
)

export function useScrollSpy() {
  const value = useContext(ValueContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  useDebugValue(value[0])
  return value
}
export function useScrollActions() {
  const value = useContext(UpdateContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  return value
}

const initialState: State = {
  index: 0,
  inViewNode: null,
  isBottom: false,
  lastNode: null
}

export function ScrollSpy({ id, children }: HostProps) {
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

  useEffect(() => observer.start({ threshold: 0.5 }), [observer])
  useEffect(() => setState(initialState), [id])
  useEffect(() => {
    behaviorRef.current = isFullSize ? 'auto' : 'smooth'
  }, [isFullSize])
  useEffect(() => {
    const handle = () => {
      if (state.isBottom && state.lastNode) {
        state.lastNode.scrollIntoView()
      } else if (state.inViewNode) {
        state.inViewNode.scrollIntoView()
      }
    }

    stateRef.current = state
    window.addEventListener('resize', handle)
    return () => {
      window.removeEventListener('resize', handle)
    }
  }, [state])

  return (
    <ValueContext.Provider value={[state, actions]}>
      <UpdateContext.Provider value={actions}>
        {children}
        <Hotkey {...KEY_ASSIGNMENT.goPrevImage} action={actions.scrollPrev} />
        <Hotkey {...KEY_ASSIGNMENT.goNextImage} action={actions.scrollNext} />
        <Hotkey {...KEY_ASSIGNMENT.info} action={actions.scrollBottom} />
      </UpdateContext.Provider>
    </ValueContext.Provider>
  )
}
export function SpyItem({ index, children }: ItemProps) {
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
export function SpyItemLast({ children }: LastItemProps) {
  const { setIsBottom, ...observer } = useScrollActions()
  const ref = useIntersectionEffect(
    observer,
    useCallback(entry => setIsBottom(entry.isIntersecting, entry.target), [
      setIsBottom
    ])
  )

  return <Box ref={ref}>{children}</Box>
}
export { OverLay }

const Box = styled.div`
  position: relative;
  top: calc(1px + var(--caption-height));
  height: 1px;
`
