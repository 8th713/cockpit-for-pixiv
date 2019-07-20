import React from 'react'
import { useRouteId } from '../../Router'
import { useServices } from '../../Services'
import { IconButton, Refresh } from '../../shared'

export function ReloadButton() {
  const { useIllust } = useServices()
  const id = useRouteId()
  const illust = useIllust(id)

  if (illust) return null

  return (
    <IconButton onClick={() => useIllust.remove(id)} title="再読込">
      <Refresh />
    </IconButton>
  )
}
