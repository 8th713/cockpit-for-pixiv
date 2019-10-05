import React, { useMemo } from 'react'
import { AccountIcon } from './Icon'
import { Img } from './Img'
import { SxProps } from './utils'

interface Props extends SxProps {
  src?: string
  size?: number
}

export const Avatar = ({ src, sx, size = 40 }: Props) => {
  const memoizedSx = useMemo<NonNullable<typeof sx>>(
    () => ({
      width: size,
      height: size,
      flexShrink: 0,
      bg: '#fff',
      color: 'primary',
      borderRadius: '50%',
      objectFit: 'contain',
      ...sx
    }),
    [size, sx]
  )

  return src ? (
    <Img loading="lazy" src={src} width={size} height={size} sx={memoizedSx} />
  ) : (
    <AccountIcon width={size} height={size} sx={memoizedSx} />
  )
}
