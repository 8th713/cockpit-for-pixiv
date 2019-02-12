import { useRef, useLayoutEffect } from 'react'

export function useUnmount() {
  const unmounted = useRef(true)

  useLayoutEffect(() => {
    unmounted.current = false
    return () => {
      unmounted.current = true
    }
  }, [unmounted])

  return unmounted
}
