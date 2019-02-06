import { useState, useRef, useCallback, Dispatch, SetStateAction } from 'react'

/**
 * Returns a stateful value, and a function to update it.
 * and RefObject with latest value.
 */
export function useStateRef<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>, () => S] {
  const [state, setState] = useState(initialState)
  const ref = useRef(state)
  const get = useCallback(() => ref.current, [])

  ref.current = state
  return [state, setState, get]
}
