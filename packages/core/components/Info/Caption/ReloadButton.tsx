import React from 'react'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { Refresh } from '../../shared/Icon'
import { IconButton } from '../../shared/IconButton'

export function ReloadButton() {
  const { apiClient } = useServices()
  const { read, remove } = apiClient.useIllust()
  const id = useRoute()[0]!
  const illust = read(id!)

  if (illust) return null

  return (
    <IconButton onClick={() => remove(id!)} title="再読込">
      <Refresh />
    </IconButton>
  )
}
