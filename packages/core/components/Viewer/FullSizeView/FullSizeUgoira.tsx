import React from 'react'
import { Page } from '../../../interfaces'
import { FullSizeImg } from './FullSizeImg'
import { FullSizePlayerLoader } from './FullSizePlayerLoader'

type Props = Page & {
  id: string
}

export function FullSizeUgoira({ id, ...props }: Props) {
  return (
    <React.Suspense fallback={<FullSizeImg {...props} />}>
      <FullSizePlayerLoader id={id} {...props} />
    </React.Suspense>
  )
}
