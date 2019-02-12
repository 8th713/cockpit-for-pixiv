import { useEffect } from 'react'
import { useToggle } from './useToggle'

export function useCheckbox(initialValue: boolean) {
  const [checked, toggle] = useToggle(initialValue)
  function onChange() {
    toggle()
  }

  useEffect(() => toggle(initialValue), [initialValue])

  return { checked, toggle, inputProps: { checked, onChange } }
}
