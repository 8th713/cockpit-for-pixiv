import React, { useCallback, useRef, useState } from 'react'
import { useLazyObserver } from './Related'

type Props = React.ComponentPropsWithoutRef<'img'> & {
  size: number
}

export function Img({ src, size, ...props }: Props) {
  const observer = useLazyObserver()
  const [inView, setInview] = useState(false)
  const finalSrc = inView ? src : void 0
  const nodeRef = useRef<Element | null>(null)
  const ref = useCallback(
    (node: Element | null) => {
      if (nodeRef.current) {
        observer.unobserve(nodeRef.current)
      }
      nodeRef.current = node
      if (node) {
        observer.observe(node, entry => {
          if (entry.isIntersecting) {
            setInview(true)
            observer.unobserve(node)
          }
        })
      }
    },
    [observer]
  )

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
