import { useState, useEffect, ChangeEvent } from 'react'

export function useInput(initialValue: string) {
  const [value, set] = useState(initialValue)

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    set(event.target.value)
  }

  useEffect(() => set(initialValue), [initialValue])

  return { value, set, inputProps: { value, onChange } }
}
