import React from 'react'
import { getHotkeyHint, IconButton, ScrollBottomIcon } from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { useScrollActions } from './ScrollSpy'

const title = getHotkeyHint(KEY_ASSIGNMENT.info)

export const ScrollButton = () => {
  const { scrollBottom } = useScrollActions()

  return (
    <IconButton onClick={scrollBottom} title={title}>
      <ScrollBottomIcon />
    </IconButton>
  )
}
