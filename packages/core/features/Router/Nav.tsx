import React from 'react'
import styled from 'styled-components'
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  extend,
  Flex,
  getHotkeyHint,
  Hotkey,
  IconButton,
  themeGet
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { useRouteActions } from './Router'

const prev = getHotkeyHint(KEY_ASSIGNMENT.goPrevIllust)
const next = getHotkeyHint(KEY_ASSIGNMENT.goNextIllust)

export const Nav = () => {
  const { goPrev, goNext } = useRouteActions()

  return (
    <Flex
      sx={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'space-between',
        size: '100%'
      }}
    >
      <Circle>
        <IconButton onClick={goPrev} title={prev}>
          <ArrowBackIcon />
          <Hotkey {...KEY_ASSIGNMENT.goPrevIllust} action={goPrev} />
        </IconButton>
      </Circle>
      <Circle>
        <IconButton onClick={goNext} title={next}>
          <ArrowForwardIcon />
          <Hotkey {...KEY_ASSIGNMENT.goNextIllust} action={goNext} />
        </IconButton>
      </Circle>
    </Flex>
  )
}

const Circle = styled.div(
  extend({
    pointerEvents: 'auto',
    position: 'sticky',
    top: 'calc(50vh - var(--caption-height))',
    width: '48px',
    height: '48px',
    mx: 2,
    borderRadius: '50%',
    bg: 'surface',
    opacity: themeGet('opacities.inactive'),
    transform: 'translateY(-50%)',
    ':hover': {
      opacity: 1
    }
  })
)

if (__DEV__) {
  Circle.displayName = 'Nav.Circle'
}
