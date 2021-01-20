import React from 'react'
import { getHotkeyHint, KEY_ASSIGNMENT } from '../../../keyboardMap'
import { HelpIcon } from '../../../shared/Icon'
import { IconButton } from '../../../shared/IconButton'
import { useSetAbout } from '../../About/aboutState'

const title = getHotkeyHint(KEY_ASSIGNMENT.help)

export const AboutButton = () => {
  const { open } = useSetAbout()

  return (
    <IconButton type="button" onClick={open} title={title}>
      <HelpIcon />
    </IconButton>
  )
}
