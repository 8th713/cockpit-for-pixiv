import { useState, useLayoutEffect } from 'react'
import { Dimension } from '../interfaces'

export function useBoardSize(
  node: React.RefObject<HTMLElement>,
  padding: number
) {
  const [size, setSize] = useState<Dimension>({ width: 0, height: 0 })
  const width = size.width - padding * 2
  const height = size.height - padding * 2

  useLayoutEffect(() => {
    const { current } = node

    if (current === null) return

    const observer = new ResizeObserver(() =>
      setSize({
        width: current.clientWidth,
        height: current.clientHeight
      })
    )

    observer.observe(current)
    return () => observer.unobserve(current)
  }, [node])

  return { width, height, node }
}
