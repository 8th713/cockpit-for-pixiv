import { useRef, useCallback } from 'react'
import { useStorage } from './useStorage'

export function useExpansion() {
  const [value, set] = useStorage('info', true)
  const ref = useRef(value)
  const toggle = useCallback((newValue?: boolean) => {
    if (typeof newValue === 'undefined') {
      set(v => !v)
    } else if (newValue !== ref.current) {
      set(newValue)
    }
  }, [])

  ref.current = value
  return { value, toggle }
}
