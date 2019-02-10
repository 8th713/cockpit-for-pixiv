import { useState, useRef } from 'react'

export function useStateRef<S>(initialState: S | (() => S)) {
  const [value, update] = useState(initialState)
  const ref = useRef({ value, update })

  ref.current.value = value
  ref.current.update = update
  return ref.current
}
