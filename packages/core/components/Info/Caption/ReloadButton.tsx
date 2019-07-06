import React from 'react'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { Refresh } from '../../shared/Icon'
import { IconButton } from '../../shared/IconButton'

export function ReloadButton() {
  const { useIllust } = useServices()
  const id = useRoute()[0]!
  const illust = useIllust(id)

  if (illust) return null

  return (
    <IconButton onClick={() => useIllust.remove(id)} title="再読込">
      <Refresh />
    </IconButton>
  )
}
