import React, {
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { useIntersection } from '../../../hooks/useIntersection'
import { Hotkey } from '../../shared'
import { useFullSizeMode } from '../FullSizeMode'
import { OverLay } from './OverLay'

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
type Action =
  | { type: 'move'; index: number; inViewNode: Element }
  | { type: 'changeBottom'; isBottom: boolean; lastNode: Element }
  | { type: 'reset' }
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
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'move': {
      const { index, inViewNode } = action
      if (index === state.index && inViewNode === state.inViewNode) return state
      return { ...state, index, inViewNode }
    }
    case 'changeBottom': {
      const { isBottom, lastNode } = action
      if (isBottom === state.isBottom && lastNode === state.lastNode)
        return state
      return { ...state, isBottom, lastNode }
    }
    case 'reset': {
      const { lastNode } = state
      return { ...initialState, lastNode }
    }
  }
}

export function ScrollSpy({ id, children }: HostProps) {
  const observer = useIntersection()
  const [isFullSize, setFullSize] = useFullSizeMode()
  const [state, dispatch] = useReducer(reducer, initialState)
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
      dispatch({ type: 'move', index, inViewNode })
    const setIsBottom = (isBottom: boolean, lastNode: Element) =>
      dispatch({ type: 'changeBottom', isBottom, lastNode })

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
  useEffect(() => dispatch({ type: 'reset' }), [id])
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
  const { setIndex, observe, unobserve } = useScrollActions()
  const nodeRef = useRef<Element | null>(null)
  const ref = useCallback(
    (node: Element | null) => {
      if (nodeRef.current) {
        unobserve(nodeRef.current)
      }
      nodeRef.current = node
      if (node) {
        observe(node, entry => {
          if (entry.isIntersecting) {
            setIndex(index, entry.target)
          }
        })
      }
    },
    [index, setIndex, observe, unobserve]
  )

  return <span ref={ref}>{children}</span>
}
export function SpyItemLast({ children }: LastItemProps) {
  const { setIsBottom, observe, unobserve } = useScrollActions()
  const nodeRef = useRef<Element | null>(null)
  const ref = useCallback(
    (node: Element | null) => {
      if (nodeRef.current) {
        unobserve(nodeRef.current)
      }
      nodeRef.current = node
      if (node) {
        observe(node, entry => {
          setIsBottom(entry.isIntersecting, entry.target)
        })
      }
    },
    [setIsBottom, observe, unobserve]
  )

  return (
    <span
      ref={ref}
      style={{
        position: 'relative',
        top: 'calc(1px + var(--caption-height))',
        display: 'block',
        height: 1
      }}
    >
      {children}
    </span>
  )
}
export { OverLay }
