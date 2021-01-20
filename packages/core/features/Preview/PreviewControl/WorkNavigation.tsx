import React from 'react'
import { getHotkeyHint, KEY_ASSIGNMENT } from '../../../keyboardMap'
import { Hotkey } from '../../../shared/Hotkey'
import { ArrowBackIcon, ArrowForwardIcon } from '../../../shared/Icon'
import { IconButton } from '../../../shared/IconButton'
import { useNavigate } from '../../Router/routerState'
import { useIsFullSize } from '../previewState'
import { Cover } from './Cover'

const previousTitle = getHotkeyHint(KEY_ASSIGNMENT.goPrevIllust)
const nextTitle = getHotkeyHint(KEY_ASSIGNMENT.goNextIllust)

export const WorkNavigation = () => {
  const isFullSize = useIsFullSize()
  const nav = useNavigate()

  if (isFullSize) return null

  return (
    <Cover
      css={{
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '$2',
      }}
    >
      <IconButton
        css={{ top: 'calc(50vh - 56px)' }}
        variant="circle"
        title={previousTitle}
        onClick={nav.goPrev}
      >
        <ArrowBackIcon />
        <Hotkey {...KEY_ASSIGNMENT.goPrevIllust} onKeydown={nav.goPrev} />
      </IconButton>
      <IconButton
        css={{ top: 'calc(50vh - 56px)' }}
        variant="circle"
        title={nextTitle}
        onClick={nav.goNext}
      >
        <ArrowForwardIcon />
        <Hotkey {...KEY_ASSIGNMENT.goNextIllust} onKeydown={nav.goNext} />
      </IconButton>
    </Cover>
  )
}
