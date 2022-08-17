import { useLayoutEffect } from 'react'

export function useScrollReset(elementId: string, images?: Pixiv.Images): void
export function useScrollReset(elementId: string, image?: Pixiv.Image): void
export function useScrollReset(
  elementId: string,
  data?: Pixiv.Images | Pixiv.Image
) {
  useLayoutEffect(() => {
    return () => {
      const element = document.getElementById(elementId)

      element?.scroll(0, 0)
      element?.focus()
    }
  }, [elementId, data])
}
