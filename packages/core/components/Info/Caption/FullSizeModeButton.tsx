import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { FullScreen } from '../../shared/Icon'
import { IconButton } from '../../shared/IconButton'
import { useUpdateFullSizeMode } from '../../Viewer'
import { getTitle } from '../utils'

const title = getTitle(KEY_ASSIGNMENT.fullSizeMode)

export function FullSizeModeButton() {
  const update = useUpdateFullSizeMode()
  const toggle = () => update(v => !v)

  return (
    <IconButton onClick={toggle} title={title}>
      <FullScreen />
    </IconButton>
  )
}
