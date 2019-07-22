import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { IconButton, ScrollBottom } from '../../shared'
import { useScrollActions } from '../../Viewer/ScrollSpy'
import { getTitle } from '../utils'

const title = getTitle(KEY_ASSIGNMENT.info)

export function ScrollButton() {
  const { scrollBottom } = useScrollActions()

  return (
    <IconButton onClick={scrollBottom} title={title}>
      <ScrollBottom />
    </IconButton>
  )
}
