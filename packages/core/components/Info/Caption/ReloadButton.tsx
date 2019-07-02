import React from 'react'
import { Refresh } from '../../shared/Icon'
import { IconButton } from '../../shared/IconButton'
import { useIllust } from '../IllustHost'

export function ReloadButton() {
  const { read, reload } = useIllust()
  const illust = read()

  if (illust) return null

  return (
    <IconButton onClick={() => reload()} title="再読込">
      <Refresh />
    </IconButton>
  )
}
