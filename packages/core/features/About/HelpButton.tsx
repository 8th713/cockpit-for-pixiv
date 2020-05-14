import React from 'react'
import { getHotkeyHint, HelpIcon, IconButton } from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { useUpdateAbout } from './About'

const title = getHotkeyHint(KEY_ASSIGNMENT.help)

export const HelpButton = () => {
  const setHelp = useUpdateAbout()
  const openHelp = () => setHelp(true)

  return (
    <IconButton onClick={openHelp} title={title}>
      <HelpIcon />
    </IconButton>
  )
}
