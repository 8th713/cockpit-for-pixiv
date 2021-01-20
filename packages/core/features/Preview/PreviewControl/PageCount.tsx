import React from 'react'
import { Badge } from '../../../shared/Badge'
import { useItems, useSelected } from '../previewState'
import { Cover } from './Cover'

export const PageCount = () => {
  const items = useItems()
  const [selected] = useSelected()

  if (items.length <= 1) return null

  const idx = items.findIndex((element) => element === selected)

  return (
    <Cover css={{ textAlign: 'right' }}>
      <Badge
        css={{
          position: 'sticky',
          top: '$2',
          right: '$2',
          paddingX: '$3',
        }}
      >{`${idx + 1} / ${items.length}`}</Badge>
    </Cover>
  )
}
