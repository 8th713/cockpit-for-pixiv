import React from 'react'

type Props = React.ComponentPropsWithoutRef<'img'> & {
  size: number
}

export const Img = ({ src, size, ...props }: Props) => (
  <img loading="lazy" width={size} height={size} alt="" {...props} src={src} />
)
