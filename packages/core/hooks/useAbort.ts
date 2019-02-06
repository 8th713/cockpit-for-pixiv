import { useRef, useLayoutEffect } from 'react'

export function useAbort() {
  const ref = useRef<AbortController>(null as any)
  if (ref.current === null) {
    ref.current = new AbortController()
  }
  function abortable<T>(thenable: Promise<T>) {
    const promise = new Promise<unknown>((_, reject) => {
      ref.current.signal.addEventListener('abort', () => {
        reject(new DOMException('Aborted', 'AbortError'))
      })
    })
    return Promise.race([promise, thenable]) as Promise<T>
  }

  useLayoutEffect(() => () => ref.current.abort(), [])
  return { abortable, signal: ref.current.signal }
}
