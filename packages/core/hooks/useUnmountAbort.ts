import { useRef, useLayoutEffect } from 'react'

export function useUnmountAbort() {
  const ref = useRef<AbortController>(null as any)
  if (ref.current === null) {
    ref.current = new AbortController()
  }

  useLayoutEffect(() => () => ref.current.abort(), [])

  return function abortable<T>(thenable: Promise<T>) {
    const promise = new Promise<unknown>((_, reject) => {
      ref.current.signal.addEventListener('abort', () => {
        reject(new AbortError('Component unmounted'))
      })
    })
    return Promise.race([promise, thenable]) as Promise<T>
  }
}

export class AbortError extends Error {
  constructor(message = 'Aborted') {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AbortError)
    }
    this.name = 'AbortError'
  }
}
