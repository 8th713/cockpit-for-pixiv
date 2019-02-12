import { useState, useLayoutEffect } from 'react'
import { Dimension } from '../interfaces'

type RefCallback<E> = (node: E | null) => void

export function useElementSize<E extends HTMLElement>(
  padding: number = 0
): [RefCallback<E>, Dimension, E | null] {
  const [node, ref] = useState<E | null>(null)
  const [size, setSize] = useState<Dimension>({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (node === null) return

    const observer = new ResizeObserver(() =>
      setSize({
        width: node.offsetWidth - padding * 2,
        height: node.offsetHeight - padding * 2
      })
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [node, padding])

  return [ref, size, node]
}
