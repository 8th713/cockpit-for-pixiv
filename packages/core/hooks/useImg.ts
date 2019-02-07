import { useState, useLayoutEffect } from 'react'
import { useUnmountAbort } from './useUnmountAbort'
import { Page } from '../interfaces'

export function useImg(page: Page) {
  const abortable = useUnmountAbort()
  const [url, setUrl] = useState(() =>
    page.urls.small.replace('540x540_70', '150x150')
  )

  useLayoutEffect(() => {
    if (url === page.urls.original) return

    abortable(fetchImage(page.urls.original, url)).then(setUrl)
  }, [])

  return url
}

export function useLazyImg(
  page: Page,
  entry: IntersectionObserverEntry | null
) {
  const abortable = useUnmountAbort()
  const [url, setUrl] = useState(() =>
    page.urls.small.replace('540x540_70', '150x150')
  )

  useLayoutEffect(() => {
    if (!entry || !entry.isIntersecting) return
    if (url === page.urls.original) return

    abortable(fetchImage(page.urls.original, url)).then(setUrl)
  }, [entry])

  return url
}

function fetchImage(src: string, fallback: string) {
  return new Promise<string>((resolve, reject) => {
    const i = new Image()
    i.onload = () => resolve(src)
    i.onerror = () => reject(new Error('Image could not be loaded'))
    i.src = src
  }).catch(error => {
    console.error(error)
    return fallback
  })
}
