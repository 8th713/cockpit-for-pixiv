import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useUpdateFullSizeMode } from '../FullSizeView'
import { useInView, useIObserver } from '../IntersectionObserver'
import { useResize } from './useResize'

type Props = Pixiv.Page

export const PADDING = 32

const getURL = (page: Pixiv.Page, inView: boolean) => {
  if (inView) return page.urls.original
  return page.urls.small.replace('540x540_70', '150x150')
}

function LazyImg(props: Props) {
  const { urls, ...rest } = props
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
    <img
      ref={ref}
      alt=""
      {...rest}
      src={getURL(props, inView)}
      onClick={e => {
        e.stopPropagation()
        fullSize(true)
      }}
    />
  )
}

export const StandardImg = styled(LazyImg)`
  cursor: zoom-in;
  object-fit: contain;
  display: block;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  background-color: rgba(255, 255, 255, var(--high));
`
