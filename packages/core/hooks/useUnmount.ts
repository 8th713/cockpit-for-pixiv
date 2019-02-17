import { useLayoutEffect, useRef } from 'react'

export function useUnmount() {
  const unmounted = useRef(true)

  useLayoutEffect(() => {
    unmounted.current = false
    return () => {
      unmounted.current = true
    }
  }, [])

  return unmounted
}
