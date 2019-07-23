import { useRef, useState, useCallback } from 'react'
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom'

interface Observer {
  start: (options?: IntersectionObserverInit) => () => void
  observe: (node: Element, callback: Callback) => void
  unobserve: (node: Element) => void
}

type Callback = (entry: IntersectionObserverEntry) => void

const createObserver = () => {
  const callbacks = new Map<Element, Callback>()
  let instance: IntersectionObserver | null
  const start = (options: IntersectionObserverInit = {}) => {
    instance = new IntersectionObserver(entries => {
      batchedUpdates(() => {
        for (const entry of entries) {
          const callback = callbacks.get(entry.target)
          if (callback) {
            callback(entry)
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

export function useIntersectionEffect(observer: Observer, callback: Callback) {
  const ref = useRef<Element | null>(null)
  const setRef = useCallback(
    (node: Element | null) => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
      ref.current = node
      if (node) {
        observer.observe(node, callback)
      }
    },
    [observer, callback]
  )
  return setRef
}

export function useInView(observer: Observer, once?: boolean) {
  const [inView, update] = useState(false)
  const setRef = useIntersectionEffect(
    observer,
    useCallback(
      entry => {
        if (entry.isIntersecting && once) {
          update(true)
          observer.unobserve(entry.target)
        }
      },
      [observer, once]
    )
  )
  return [inView, setRef] as const
}
