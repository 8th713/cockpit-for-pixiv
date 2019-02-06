import { useState, useLayoutEffect } from 'react'
import { Dimension } from '../interfaces'

export function useBoardSize(
  ref: React.RefObject<HTMLElement>,
  padding: number
) {
  const [size, setSize] = useState<Dimension>({ width: 0, height: 0 })
  const width = size.width - padding * 2
  const height = size.height - padding * 2

  useLayoutEffect(
    () => {
      const { current } = ref
      if (current === null) return
      const observer = new ResizeObserver(() => {
        setSize({ width: current.clientWidth, height: current.clientHeight })
      })
      observer.observe(current)
      return () => observer.unobserve(current)
    },
    [ref.current]
  )

  return { width, height, ref }
}
