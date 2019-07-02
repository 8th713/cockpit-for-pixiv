import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { useScrollSpy } from '../../Viewer/ScrollSpy'
import { ScrollBottom } from '../../shared/Icon'
import { IconButton } from '../../shared/IconButton'
import { getTitle } from '../utils'

const title = getTitle(KEY_ASSIGNMENT.info)

export function ScrollButton() {
  const [, , scroll] = useScrollSpy()

  return (
    <IconButton onClick={scroll.bottom} title={title}>
      <ScrollBottom />
    </IconButton>
  )
}
