import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { useUpdateAbout } from '../../About'
import { getHotkeyHint, Help, IconButton } from '../../shared'

const title = getHotkeyHint(KEY_ASSIGNMENT.help)

export function HelpButton() {
  const setHelp = useUpdateAbout()
  const openHelp = () => setHelp(true)

  return (
    <IconButton onClick={openHelp} title={title}>
      <Help />
    </IconButton>
  )
}
