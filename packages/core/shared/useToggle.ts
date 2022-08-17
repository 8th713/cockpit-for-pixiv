import { useCallback, useState } from 'react'

export function useToggle() {
  const [state, setState] = useState(false)
  const toggle = useCallback((nextValue?: boolean) => {
    setState((current) => nextValue ?? !current)
  }, [])

  return [state, toggle] as const
}
