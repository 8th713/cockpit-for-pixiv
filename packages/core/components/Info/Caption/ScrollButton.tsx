import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { getHotkeyHint, IconButton, ScrollBottom } from '../../shared'
import { useScrollActions } from '../../Viewer/ScrollSpy'

const title = getHotkeyHint(KEY_ASSIGNMENT.info)

export function ScrollButton() {
  const { scrollBottom } = useScrollActions()

  return (
    <IconButton onClick={scrollBottom} title={title}>
      <ScrollBottom />
    </IconButton>
  )
}
