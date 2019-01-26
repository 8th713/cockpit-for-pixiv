import { useState, useLayoutEffect } from 'react'
import { useAbort } from './useAbort'
import { Page } from '../interfaces'

export function useImg(page: Page) {
  const { abortable } = useAbort()
  const [url, setUrl] = useState(() =>
    page.urls.small.replace('540x540_70', '150x150')
  )

  useLayoutEffect(() => {
    if (url === page.urls.original) return
    abortable(fetchImage(page.urls.original)).then(setUrl)
  }, [])

  return url
}

export function useLazyImg(
  page: Page,
  entry: IntersectionObserverEntry | null
) {
  const { abortable } = useAbort()
  const [url, setUrl] = useState(() =>
    page.urls.small.replace('540x540_70', '150x150')
  )

  useLayoutEffect(
    () => {
      if (!entry || !entry.isIntersecting) return
      if (url === page.urls.original) return
      abortable(fetchImage(page.urls.original)).then(setUrl)
    },
    [entry]
  )

  return url
}

function fetchImage(src: string) {
  return new Promise<string>((resolve, reject) => {
    const i = new Image()
    i.onload = () => resolve(src)
    i.onerror = () => reject(new Error('error'))
    i.src = src
  })
}
