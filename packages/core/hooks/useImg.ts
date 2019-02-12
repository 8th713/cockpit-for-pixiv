import { useState, useLayoutEffect, useContext } from 'react'
import { ClientContext } from '../contexts'
import { useUnmount } from './useUnmount'
import { Page } from '../interfaces'

export function useImg(page: Page) {
  const unmounted = useUnmount()
  const { fetchImage } = useContext(ClientContext)
  const [url, setUrl] = useState(() =>
    page.urls.small.replace('540x540_70', '150x150')
  )

  useLayoutEffect(() => {
    if (url === page.urls.original) return

    fetchImage(page.urls.original).then(src => {
      if (unmounted.current) return
      if (src === null) return
      setUrl(src)
    })
  }, [])

  return url
}

export function useLazyImg(
  page: Page,
  entry: IntersectionObserverEntry | null
) {
  const unmounted = useUnmount()
  const { fetchImage } = useContext(ClientContext)
  const [url, setUrl] = useState(() =>
    page.urls.small.replace('540x540_70', '150x150')
  )

  useLayoutEffect(() => {
    if (!entry || !entry.isIntersecting) return
    if (url === page.urls.original) return

    fetchImage(page.urls.original).then(src => {
      if (unmounted.current) return
      if (src === null) return
      setUrl(src)
    })
  }, [entry])

  return url
}
