import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { useUpdateAbout } from '../../About'
import { Help } from '../../shared/Icon'
import { IconButton } from '../../shared/IconButton'
import { getTitle } from '../utils'

const title = getTitle(KEY_ASSIGNMENT.help)

export function HelpButton() {
  const setHelp = useUpdateAbout()
  const openHelp = () => setHelp(true)

  return (
    <IconButton onClick={openHelp} title={title}>
      <Help />
    </IconButton>
  )
}
