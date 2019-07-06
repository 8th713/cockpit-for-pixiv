import React from 'react'
import { Page } from '../../../interfaces'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { Img } from './Img'
import { Player } from './Player'

type Props = Page

export function Ugoira({ ...props }: Props) {
  return (
    <React.Suspense fallback={<Img {...props} />}>
      <UgoiraLoader {...props} />
    </React.Suspense>
  )
}

function UgoiraLoader({ ...props }: Props) {
  const { useUgoira } = useServices()
  const id = useRoute()[0]!
  const frames = useUgoira(id)

  if (!frames) return <Img {...props} />
  return <Player {...props} frames={frames} />
}
