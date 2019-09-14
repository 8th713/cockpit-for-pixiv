import React from 'react'
import {
  ArrowBackIcon,
  getHotkeyHint,
  Hotkey,
  IconButton
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { useRouteActions } from './Router'

const title = getHotkeyHint(KEY_ASSIGNMENT.goPrevIllust)

export const GoPreviousButton = () => {
  const { goPrev } = useRouteActions()

  return (
    <IconButton onClick={goPrev} title={title}>
      <ArrowBackIcon />
      <Hotkey {...KEY_ASSIGNMENT.goPrevIllust} action={goPrev} />
    </IconButton>
  )
}
