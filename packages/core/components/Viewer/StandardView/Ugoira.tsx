import React from 'react'
import { Page } from '../../../interfaces'
import { useServices } from '../../Services'
import { usePages } from '../PagesHost'
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
  const { apiClient } = useServices()
  const { input: id } = usePages()
  const { read } = apiClient.useUgoira(id)
  const frames = read()

  if (!frames) return <Img {...props} />
  return <Player {...props} frames={frames} />
}
