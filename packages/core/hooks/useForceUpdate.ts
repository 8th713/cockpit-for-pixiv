import { useReducer } from 'react'

export function useForceUpdate() {
  const [, update] = useReducer(n => n + 1, 0)

  return () => update(0)
}
