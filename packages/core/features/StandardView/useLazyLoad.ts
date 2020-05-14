import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { Observer } from '../IntersectionObserver'

export const LazyLoadingObserver = createContext<Observer | null>(null)
export const useLazyLoad = () => {
  const ref = useRef<Element | null>(null)
  const observer = useContext(LazyLoadingObserver)
  if (observer === null) throw new Error('Missing LazyLoadingObserver')
  const [inView, setInView] = useState(false)
  const setRef = useCallback(
    (node: Element | null) => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
      ref.current = node
      if (node) {
        observer.observe(node, entry => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        })
      }
    },
    [observer]
  )
  return [inView, setRef] as const
}

if (__DEV__) {
  LazyLoadingObserver.displayName = 'LazyLoadingObserver'
}
