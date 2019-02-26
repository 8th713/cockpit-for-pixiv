import { useReducer } from 'react'

export function useForceUpdate() {
  const [, update] = useReducer(reducer, false)

  return update as () => void
}

function reducer(on: boolean) {
  return !on
}
