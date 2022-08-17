import { useCallback, useRef } from 'react'

export function useRefCallback<T extends Element>(
  callback: (node: T) => (() => void) | void,
  deps: React.DependencyList
): React.RefCallback<T> {
  const cleanup = useRef<() => void>()

  return useCallback((node: T | null) => {
    if (cleanup.current) {
      cleanup.current()
      cleanup.current = undefined
    }
    if (node) {
      cleanup.current = callback(node) || undefined
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
