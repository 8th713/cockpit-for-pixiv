import { useReducer } from 'react'

type Toggle = (force?: boolean) => void

export function useToggle(value: boolean): [boolean, Toggle] {
  return useReducer(reducer, value)
}

function reducer(on: boolean, force?: boolean) {
  if (typeof force === 'undefined') {
    return !on
  }
  return force
}
