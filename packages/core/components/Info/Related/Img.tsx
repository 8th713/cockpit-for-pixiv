import React from 'react'
import { useInView } from '../../../hooks/useIntersection'
import { useLazyObserver } from './Related'

type Props = React.ComponentPropsWithoutRef<'img'> & {
  size: number
}

export function Img({ src, size, ...props }: Props) {
  const observer = useLazyObserver()
  const [inView, ref] = useInView(observer, true)
  const finalSrc = inView ? src : void 0

  return (
    <img
      ref={ref}
      width={size}
      height={size}
      alt=""
      {...props}
      src={finalSrc}
    />
  )
}
