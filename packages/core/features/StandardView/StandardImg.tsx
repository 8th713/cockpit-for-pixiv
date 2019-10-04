import React, { useCallback } from 'react'
import { Img } from '../../components'
import { useUpdateFullSizeMode } from '../FullSizeView'
import { useInView, useIObserver } from '../IntersectionObserver'
import { useResize } from './useResize'

export const PADDING = 32

export const StandardImg = ({ urls, ...rest }: Pixiv.Page) => {
  const observer = useIObserver()
  const [inView, observe] = useInView(observer, true)
  const fullSize = useUpdateFullSizeMode()
  const resize = useResize(rest.width, rest.height, PADDING)
  const ref = useCallback(
    (node: HTMLImageElement | null) => {
      observe(node)
      resize(node)
    },
    [observe, resize]
  )

  return (
    <Img
      ref={ref}
      {...rest}
      sx={{
        cursor: 'zoom-in',
        objectFit: 'contain',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        m: 'auto',
        bg: 'rgba(255, 255, 255, .87)'
      }}
      src={getURL(urls, inView)}
      onClick={e => {
        e.stopPropagation()
        fullSize(true)
      }}
    />
  )
}

const getURL = (urls: Pixiv.PageUrls, inView: boolean) => {
  if (inView) return urls.original
  return urls.small.replace('540x540_70', '150x150')
}
