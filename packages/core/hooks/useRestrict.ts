import { useEffect, useCallback } from 'react'
import { useToggle } from './useToggle'

export function useRestrict(initialValue: boolean) {
  const [checked, toggle] = useToggle(initialValue)
  const onChange = useCallback(() => toggle(), [])

  useEffect(() => toggle(initialValue), [initialValue])

  return { checked, toggle, bind: { checked, onChange } }
}
