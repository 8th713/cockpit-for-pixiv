import { useReducer } from 'react'

export function useToggle(
  initialValue: boolean
): [boolean, (force?: boolean) => void] {
  return useReducer(reducer, initialValue)
}

function reducer(on: boolean, force?: boolean) {
  if (typeof force === 'undefined') return !on
  return force
}
