import { useCallback, useRef } from 'react'

const preload = (src: string) => {
  const img = new Image()

  img.src = src
}

export const useLazyLoad = (src: string) => {
  const cleanup = useRef<() => void>()

  return useCallback(
    (element: HTMLImageElement | null) => {
      if (cleanup.current) {
        cleanup.current()
        cleanup.current = undefined
      }
      if (element && !element.complete) {
        const root = document.getElementById('cfp-scrollable')
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              preload(src)
              unobserve()
            }
          },
          { root, rootMargin: '10%' }
        )
        const unobserve = () => {
          observer.unobserve(element)
        }

        cleanup.current = unobserve
        observer.observe(element)
      }
      return element
    },
    [src]
  )
}
