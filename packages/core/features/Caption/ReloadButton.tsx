import React from 'react'
import { IconButton, RefreshIcon } from '../../components'
import { useIllust } from '../Illust'
import { useRouteId } from '../Router'

export const ReloadButton = () => {
  const id = useRouteId()
  const illust = useIllust(id)

  if (illust) return null
  return (
    <IconButton onClick={() => useIllust.remove(id)} title="再読込">
      <RefreshIcon />
    </IconButton>
  )
}
