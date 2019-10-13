import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Hotkey } from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { useFullSizeMode } from '../FullSizeView'
import { useIntersection } from '../IntersectionObserver'

type HostProps = {
  illustId: string
  children?: React.ReactNode
}

type ItemProps = {
  index: number
  children?: React.ReactNode
}

type State = {
  page: number
  isBottom: boolean
}

type ScrollActions = {
  addSpy: (node: HTMLElement, index: number) => () => void
  addBottom: (node: HTMLElement) => () => void
  scrollIntoView: (index: number) => boolean
  scrollPrev: () => void
  scrollNext: () => void
  scrollBottom: () => void
} & ReturnType<typeof useIntersection>

type Value = [number, ScrollActions]

const initialState: State = {
  page: 0,
  isBottom: false
}
const ScrollSpyValue = React.createContext<Value | null>(null)
const ScrollSpyActions = React.createContext<ScrollActions | null>(null)

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
    const items = new Map<number, HTMLElement>()
    const addSpy = (node: HTMLElement, page: number) => {
      items.set(page, node)
      observer.observe(node, entry => {
        if (entry.isIntersecting) {
          const state = stateRef.current
          if (state.page === page && state.isBottom === false) return
          setState({ page, isBottom: false })
        }
      })
      return () => {
        items.delete(page)
        observer.unobserve(node)
      }
    }
    let lastNode: HTMLElement
    const addBottom = (node: HTMLElement) => {
      lastNode = node
      observer.observe(node, entry => {
        const isBottom = entry.isIntersecting
        setState(state => {
          if (state.isBottom === isBottom) return state
          return { ...state, isBottom }
        })
      })
      return () => {
        lastNode = null as any
      }
    }
    const scrollIntoView = (index: number) => {
      const node = items.get(index)
      if (!node) return false
      const behavior = behaviorRef.current
      node.scrollIntoView({ behavior })
      return true
    }
    const scrollPrev = () => {
      const { page, isBottom } = stateRef.current
      const targetIndex = isBottom ? page : page - 1
      if (targetIndex < 0) return
      scrollIntoView(targetIndex)
    }
    const scrollNext = () => {
      const { page, isBottom } = stateRef.current
      if (isBottom) return
      const targetIndex = page + 1
      if (!scrollIntoView(targetIndex)) {
        scrollBottom()
      }
    }
    const scrollBottom = () => {
      const behavior = behaviorRef.current
      lastNode.scrollIntoView({ behavior })
      setFullSize(false)
    }

    return {
      addSpy,
      addBottom,
      scrollIntoView,
      scrollPrev,
      scrollNext,
      scrollBottom,
      ...observer
    }
  }, [observer, setFullSize])

  useEffect(() => {
    stateRef.current = state
    behaviorRef.current = isFullSize ? 'auto' : 'smooth'
  })
  useEffect(() => observer.start({ threshold: 0.5 }), [observer])
  useLayoutEffect(() => setState(initialState), [illustId])
  useEffect(() => {
    const handle = () => {
      const { page, isBottom } = stateRef.current
      if (isBottom) {
        actions.scrollBottom()
      } else {
        actions.scrollIntoView(page)
      }
    }

    window.addEventListener('resize', handle)
    return () => {
      window.removeEventListener('resize', handle)
    }
  }, [actions])

  return (
    <ScrollSpyActions.Provider value={actions}>
      <ScrollSpyValue.Provider value={[state.page, actions]}>
        {children}
        <Hotkey {...KEY_ASSIGNMENT.goPrevImage} action={actions.scrollPrev} />
        <Hotkey {...KEY_ASSIGNMENT.goNextImage} action={actions.scrollNext} />
        <Hotkey {...KEY_ASSIGNMENT.info} action={actions.scrollBottom} />
      </ScrollSpyValue.Provider>
    </ScrollSpyActions.Provider>
  )
}

const SpyItem = ({ index, children }: ItemProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const { addSpy } = useScrollActions()

  useEffect(() => addSpy(ref.current!, index), [addSpy, index])
  return <span ref={ref}>{children}</span>
}
ScrollSpy.SpyItem = SpyItem

const SpyItemLast = () => {
  const ref = useRef<HTMLSpanElement>(null)
  const { addBottom } = useScrollActions()

  useEffect(() => addBottom(ref.current!), [addBottom])
  return (
    <span
      ref={ref}
      style={{
        position: 'relative',
        top: 'calc(1px + var(--caption-height))',
        height: 1
      }}
    />
  )
}
ScrollSpy.SpyItemLast = SpyItemLast

if (__DEV__) {
  ScrollSpyValue.displayName = 'ScrollSpyValue'
  ScrollSpyActions.displayName = 'ScrollSpyActions'
  SpyItem.displayName = 'ScrollSpy.SpyItem'
  SpyItemLast.displayName = 'ScrollSpy.SpyItemLast'
}
