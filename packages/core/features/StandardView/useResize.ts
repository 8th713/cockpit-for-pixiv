import { useCallback, useRef } from 'react'

const listeners = new Set<() => void>()
const handler = () => {
  for (const listener of listeners) {
    listener()
  }
}
const addListener = (listener: () => void) => {
  if (listeners.size === 0) {
    window.addEventListener('resize', handler)
  }
  listeners.add(listener)
  listener()
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      window.removeEventListener('resize', handler)
    }
  }
}

export const useResize = (width: number, height: number, padding: number) => {
  const cleanup = useRef<() => void>()
  return useCallback(
    (node: HTMLImageElement | null) => {
      if (cleanup.current) {
        cleanup.current()
        cleanup.current = undefined
      }
      if (node) {
        const listener = () => {
          const parent = node.parentElement!
          const boxWidth = parent.clientWidth - padding * 2
          const boxHeight = parent.clientHeight - padding * 2
          const ratio = Math.min(boxWidth / width, boxHeight / height, 1)
          if (ratio > 0) {
            node.width = Math.floor(width * ratio)
            node.height = Math.floor(height * ratio)
          } else {
            requestAnimationFrame(listener)
          }
        }
        cleanup.current = addListener(listener)
      }
    },
    [width, height, padding]
  )
}
