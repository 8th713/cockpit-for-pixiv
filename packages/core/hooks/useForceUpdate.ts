import { useReducer } from 'react'

const reducer = () => ({})

export function useForceUpdate() {
  const [, dispatch] = useReducer(reducer, {})
  return dispatch as () => void
}
