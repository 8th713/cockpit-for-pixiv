import { useContext, useLayoutEffect, useState } from 'react'
import { ClientContext } from '../contexts'
import { Page } from '../interfaces'
import { useUnmount } from './useUnmount'

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

export function useLazyImg(page: Page, inView: boolean) {
  const unmounted = useUnmount()
  const { fetchImage } = useContext(ClientContext)
  const [url, setUrl] = useState(() =>
    page.urls.small.replace('540x540_70', '150x150')
  )

  useLayoutEffect(() => {
    if (!inView) return
    if (url === page.urls.original) return

    fetchImage(page.urls.original).then(src => {
      if (unmounted.current) return
      if (src === null) return

      setUrl(src)
    })
  }, [inView])

  return url
}
