import React from 'react'
import { Page } from '../../../interfaces'
import { FullSizeImg } from './FullSizeImg'
import { useServices } from '../../Services'
import { FullSizePlayer } from './FullSizePlayer'

type Props = Page & {
  id: string
}

export function FullSizeUgoira(props: Props) {
  return (
    <React.Suspense fallback={<FullSizeImg {...props} />}>
      <FullSizeUgoiraLoader {...props} />
    </React.Suspense>
  )
}

function FullSizeUgoiraLoader({ id, ...props }: Props) {
  const { useUgoira } = useServices()
  const frames = useUgoira(id)

  if (!frames) return <FullSizeImg {...props} />
  return <FullSizePlayer {...props} frames={frames} />
}
