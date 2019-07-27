import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { FullScreen, getHotkeyHint, IconButton } from '../../shared'
import { useUpdateFullSizeMode } from '../../Viewer'

const title = getHotkeyHint(KEY_ASSIGNMENT.fullSizeMode)

export function FullSizeModeButton() {
  const update = useUpdateFullSizeMode()
  const toggle = () => update(v => !v)

  return (
    <IconButton onClick={toggle} title={title}>
      <FullScreen />
    </IconButton>
  )
}
