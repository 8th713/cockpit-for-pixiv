import { useEffect, useState } from 'react'
import { Dimension } from '../interfaces'

export function useElementSize<E extends HTMLElement>(padding: number = 0) {
  const [node, ref] = useState<E | null>(null)
  const [size, setSize] = useState<Dimension>({ width: 0, height: 0 })

  useEffect(() => {
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

  return [ref, size, node] as const
}
