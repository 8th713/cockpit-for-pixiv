import React from 'react'
import { Img } from '../../components'
import { useUpdateFullSizeMode } from '../FullSizeView'
import { useResize } from './useResize'

export const PADDING = 32

export const StandardImg = ({ urls, ...rest }: Pixiv.Page) => {
  const fullSize = useUpdateFullSizeMode()
  const resize = useResize(rest.width, rest.height, PADDING)

  return (
    <Img
      ref={resize}
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
      src={urls.original}
      loading="lazy"
      onClick={e => {
        e.stopPropagation()
        fullSize(true)
      }}
    />
  )
}
