import React from 'react'
import { useInView } from 'react-intersection-observer'

type Props = React.ComponentPropsWithoutRef<'img'> & {
  size: number
}

const options = {
  triggerOnce: true
}

export function Img({ src, size, ...props }: Props) {
  const [ref, inView] = useInView(options)
  const finalSrc = inView ? src : void 0

  return (
    <img
      ref={ref}
      width={size}
      height={size}
      alt=""
      {...props}
      data-src={src}
      src={finalSrc}
    />
  )
}
