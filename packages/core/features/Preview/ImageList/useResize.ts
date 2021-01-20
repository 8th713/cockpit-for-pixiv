import { useCallback, useRef } from 'react'

let timerId = NaN
const listeners = new Set<() => void>()
const handler = () => {
  cancelAnimationFrame(timerId)
  timerId = requestAnimationFrame(() => {
    for (const listener of listeners) {
      listener()
    }
  })
}
const addListener = (listener: () => void) => {
  if (listeners.size === 0) {
    window.addEventListener('resize', handler, { passive: true })
  }
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      window.removeEventListener('resize', handler)
    }
  }
}

export const useResize = (
  width: number,
  height: number,
  padding: number = 32
) => {
  const cleanup = useRef<() => void>()

  return useCallback(
    (element: HTMLImageElement | null, root?: HTMLElement | null) => {
      if (cleanup.current) {
        cleanup.current()
        cleanup.current = undefined
      }
      if (element) {
        const listener = () => {
          const parent = root || element.parentElement!
          const boxWidth = parent.clientWidth - padding * 2
          const boxHeight = parent.clientHeight - padding * 2
          const xScale = boxWidth / width
          const yScale = boxHeight / height
          const scale = Math.min(xScale, yScale, 1)

          if (scale > 0) {
            element.style.width = `${Math.floor(width * scale)}px`
            element.style.height = `${Math.floor(height * scale)}px`
          } else {
            requestAnimationFrame(listener)
          }
        }
        cleanup.current = addListener(listener)
        listener()
      }
      return element
    },
    [width, height, padding]
  )
}
