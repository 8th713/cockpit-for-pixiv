import { useReducer } from 'react'

export function useForceUpdate() {
  const [, update] = useReducer((bool: boolean) => !bool, false)

  return () => update(0)
}
