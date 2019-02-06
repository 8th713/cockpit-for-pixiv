import { useRef, useState, useCallback } from 'react'

type Initial = boolean | (() => boolean)
type Toggle = (newValue?: boolean) => void

export function useToggle(value: Initial): [boolean, Toggle] {
  const [on, update] = useState(value)
  const ref = useRef(on)
  const toggle = useCallback((newValue?: boolean) => {
    if (typeof newValue === 'undefined') {
      update(v => !v)
    } else if (newValue !== ref.current) {
      update(newValue)
    }
  }, [])

  ref.current = on
  return [on, toggle]
}
