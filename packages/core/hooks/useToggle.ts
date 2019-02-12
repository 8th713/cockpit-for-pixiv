import { useReducer } from 'react'

type Toggle = (newValue?: boolean) => void

export function useToggle(value: boolean): [boolean, Toggle] {
  return useReducer(reducer, value)
}

function reducer(on: boolean, payload?: boolean) {
  if (typeof payload === 'undefined') {
    return !on
  }
  return payload
}
