import { useRef } from 'react'
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom'

interface Options extends IntersectionObserverInit {
  once?: boolean
}

type Callback = (entry: IntersectionObserverEntry, options: Options) => void

export type UseInViewHook = () => [
  boolean,
  (node: Element | null) => void,
  IntersectionObserverEntry | null
]

const createObserver = () => {
  const callbacks = new Map<Element, Callback>()
  let instance: IntersectionObserver | null
  const start = (options: Options = {}) => {
    instance = new IntersectionObserver(entries => {
      batchedUpdates(() => {
        for (const entry of entries) {
          const callback = callbacks.get(entry.target)
          if (callback) {
            callback(entry, options)
          }
        }
      })
    }, options)
    for (const [node] of callbacks) {
      instance.observe(node)
    }
    return () => {
      callbacks.clear()
      if (instance) {
        instance.disconnect()
        instance = null
      }
    }
  }
  const observe = (node: Element, callback: Callback) => {
    callbacks.set(node, callback)
    if (instance) {
      instance.observe(node)
    }
  }
  const unobserve = (node: Element) => {
    callbacks.delete(node)
    if (instance) {
      instance.unobserve(node)
    }
  }

  return { start, observe, unobserve }
}

export function useIntersection() {
  const observer = useRef<ReturnType<typeof createObserver>>()
  if (observer.current) return observer.current
  observer.current = createObserver()
  return observer.current
}
