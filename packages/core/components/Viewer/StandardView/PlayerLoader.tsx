import React, { useRef } from 'react'
import { Page } from '../../../interfaces'
import { useServices } from '../../Services'
import { Img } from './Img'
import { Player } from './Player'

type Props = Page & {
  id: string
}

export function PlayerLoader({ id, ...props }: Props) {
  const root = useRef(null)
  const { apiClient } = useServices()
  const { read } = apiClient.useUgoira(id)
  const frames = read()

  if (!frames) return <Img root={root} {...props} />
  return <Player {...props} frames={frames} />
}
