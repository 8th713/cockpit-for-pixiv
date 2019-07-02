import React from 'react'
import { Page } from '../../../interfaces'
import { useServices } from '../../Services'
import { FullSizeImg } from './FullSizeImg'
import { FullSizePlayer } from './FullSizePlayer'

type Props = Page & {
  id: string
}

export function FullSizePlayerLoader({ id, ...props }: Props) {
  const { apiClient } = useServices()
  const { read } = apiClient.useUgoira(id)
  const frames = read()

  if (!frames) return <FullSizeImg {...props} />
  return <FullSizePlayer {...props} frames={frames} />
}
