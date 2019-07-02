import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useScrollSpyDispatch } from './ScrollSpy'

type Props = {
  children?: React.ReactNode
}

const options = { threshold: 0.5 }

export function SpyItemLast({ children }: Props) {
  const [setRef, , entry] = useInView(options)
  const dispatch = useScrollSpyDispatch()

  useEffect(() => {
    if (!entry) return
    dispatch({
      type: 'changeBottom',
      isBottom: entry.isIntersecting,
      lastNode: entry.target
    })
  }, [entry, dispatch])

  return (
    <span
      ref={setRef}
      style={{
        position: 'relative',
        top: 57,
        display: 'block',
        height: 1
      }}
    >
      {children}
    </span>
  )
}
