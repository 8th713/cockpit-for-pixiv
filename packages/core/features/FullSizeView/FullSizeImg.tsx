import React from 'react'
import { Img } from '../../components'

export const FullSizeImg = ({ urls, ...props }: Pixiv.Page) => (
  <Img
    sx={{
      display: 'block',
      m: 'auto',
      bg: 'rgba(255,255,255,.87)'
    }}
    src={urls.original}
    {...props}
  />
)
