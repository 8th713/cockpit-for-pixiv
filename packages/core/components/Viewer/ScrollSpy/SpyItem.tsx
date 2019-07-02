import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useScrollSpyDispatch } from './ScrollSpy'

type Props = {
  index: number
  children?: React.ReactNode
}

const options = { threshold: 0.5 }

export function SpyItem({ index, children }: Props) {
  const [setRef, , entry] = useInView(options)
  const dispatch = useScrollSpyDispatch()

  useEffect(() => {
    if (!entry) return
    if (!entry.isIntersecting) return
    dispatch({ type: 'move', index, inViewNode: entry.target })
  }, [index, entry, dispatch])

  return <span ref={setRef}>{children}</span>
}
