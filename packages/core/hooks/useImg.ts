import { useState, useLayoutEffect, useContext, useRef } from 'react'
import { ClientContext } from '../contexts'
import { Page } from '../interfaces'

export function useImg(page: Page) {
  const unmounted = useRef(true)
  const { fetchImage } = useContext(ClientContext)
  const [url, setUrl] = useState(() =>
    page.urls.small.replace('540x540_70', '150x150')
  )

  useLayoutEffect(() => {
    unmounted.current = false
    return () => {
      unmounted.current = true
    }
  }, [])
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
  const unmounted = useRef(true)
  const { fetchImage } = useContext(ClientContext)
  const [url, setUrl] = useState(() =>
    page.urls.small.replace('540x540_70', '150x150')
  )

  useLayoutEffect(() => {
    unmounted.current = false
    return () => {
      unmounted.current = true
    }
  }, [])
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
