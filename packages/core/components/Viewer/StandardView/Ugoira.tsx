import React, { useRef } from 'react'
import { Page } from '../../../interfaces'
import { Img } from './Img'
import { PlayerLoader } from './PlayerLoader'

type Props = Page & {
  id: string
}

export function Ugoira({ id, ...props }: Props) {
  const root = useRef(null)

  return (
    <React.Suspense fallback={<Img root={root} {...props} />}>
      <PlayerLoader id={id} {...props} />
    </React.Suspense>
  )
}
