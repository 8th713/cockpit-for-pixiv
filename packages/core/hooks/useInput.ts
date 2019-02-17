import { useEffect, useState } from 'react'

export function useInput(initialValue: string) {
  const [value, set] = useState(initialValue)

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    set(event.target.value)
  }

  useEffect(() => set(initialValue), [initialValue])

  return { value, set, inputProps: { value, onChange } }
}
