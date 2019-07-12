import React, {
  useContext,
  useDebugValue,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { Hotkey } from '../../shared'
import { useFullSizeMode } from '../FullSizeMode'
import { OverLay } from './OverLay'
import { SpyItem } from './SpyItem'
import { SpyItemLast } from './SpyItemLast'

type Props = {
  id: string
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

type Value = readonly [
  State,
  React.Dispatch<Action>,
  {
    prev: () => void
    next: () => void
    bottom: () => void
  }
]

const NO_PROVIDER = 'Missing ScrollSpy'
const ValueContext = React.createContext<Value | typeof NO_PROVIDER>(
  NO_PROVIDER
)
const UpdateContext = React.createContext<
  React.Dispatch<Action> | typeof NO_PROVIDER
>(NO_PROVIDER)

export function useScrollSpy() {
  const value = useContext(ValueContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  useDebugValue(value[0])
  return value
}

export function useScrollSpyDispatch() {
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
      return { ...state, index, inViewNode }
    }
    case 'changeBottom': {
      const { isBottom, lastNode } = action
      return { ...state, isBottom, lastNode }
    }
    case 'reset': {
      const { lastNode } = state
      return { ...initialState, lastNode }
    }
  }
}

export function ScrollSpy({ id, children }: Props) {
  const [isFullSize, setFullSize] = useFullSizeMode()
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => {
    const { inViewNode, lastNode, isBottom } = state
    const prev = () => {
      if (!inViewNode) return
      const behavior = behaviorRef.current
      if (isBottom) {
        inViewNode.scrollIntoView({ behavior })
      } else if (inViewNode.previousElementSibling) {
        inViewNode.previousElementSibling.scrollIntoView({ behavior })
      }
    }
    const next = () => {
      if (!inViewNode) return
      const behavior = behaviorRef.current
      const next = inViewNode.nextElementSibling
      if (next) next.scrollIntoView({ behavior })
    }
    const bottom = () => {
      if (!lastNode) return
      lastNode.scrollIntoView()
    }
    const scroll = { prev, next, bottom }
    return [state, dispatch, scroll] as const
  }, [state])
  const [, , scroll] = value
  const behaviorRef = useRef<'auto' | 'smooth'>(isFullSize ? 'auto' : 'smooth')

  useEffect(() => dispatch({ type: 'reset' }), [id])
  useEffect(() => {
    behaviorRef.current = isFullSize ? 'auto' : 'smooth'
  }, [isFullSize])
  useEffect(() => {
    if (!state.isBottom) return
    setFullSize(false)
  }, [state.isBottom, setFullSize])
  useEffect(() => {
    const handle = () => {
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
  }, [state])

  return (
    <ValueContext.Provider value={value}>
      <UpdateContext.Provider value={dispatch}>
        {children}
        <Hotkey {...KEY_ASSIGNMENT.goPrevImage} action={scroll.prev} />
        <Hotkey {...KEY_ASSIGNMENT.goNextImage} action={scroll.next} />
        <Hotkey {...KEY_ASSIGNMENT.info} action={scroll.bottom} />
      </UpdateContext.Provider>
    </ValueContext.Provider>
  )
}

ScrollSpy.OverLay = OverLay
ScrollSpy.SpyItem = SpyItem
ScrollSpy.SpyItemLast = SpyItemLast
