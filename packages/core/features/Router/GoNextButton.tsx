import React from 'react'
import {
  ArrowForwardIcon,
  getHotkeyHint,
  Hotkey,
  IconButton
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { useRouteActions } from './Router'

const title = getHotkeyHint(KEY_ASSIGNMENT.goNextIllust)

export const GoNextButton = () => {
  const { goNext } = useRouteActions()

  return (
    <IconButton onClick={goNext} title={title}>
      <ArrowForwardIcon />
      <Hotkey {...KEY_ASSIGNMENT.goNextIllust} action={goNext} />
    </IconButton>
  )
}
