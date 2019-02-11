import { useRef, useCallback } from 'react'
import { useStorage } from './useStorage'

export function useExpansion(): [boolean, (newValue?: boolean) => void] {
  const [opened, set] = useStorage('info', true)
  const ref = useRef(opened)
  const toggle = useCallback((newValue?: boolean) => {
    if (typeof newValue === 'undefined') {
      set(v => !v)
    } else if (newValue !== ref.current) {
      set(newValue)
    }
  }, [])

  ref.current = opened
  return [opened, toggle]
}
