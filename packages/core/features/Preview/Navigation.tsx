import React from 'react'
import { KEY_ASSIGNMENT, toButtonTitle } from '../../keyboardMap'
import { Hotkey } from '../../shared/Hotkey'
import { IconButton } from '../../shared/IconButton'
import { ArrowBackIcon, ArrowForwardIcon } from '../../shared/Icons'
import { useNavigate } from '../App/useNavigate'
import { Backdrop } from './Backdrop'

const previousTitle = toButtonTitle(KEY_ASSIGNMENT.goPrevIllust)
const nextTitle = toButtonTitle(KEY_ASSIGNMENT.goNextIllust)

export function Navigation() {
  const navigate = useNavigate()
  const goPrevious = (e: Event | React.SyntheticEvent) => {
    e.stopPropagation()
    navigate(-1)
  }
  const goNext = (e: Event | React.SyntheticEvent) => {
    e.stopPropagation()
    navigate(1)
  }

  return (
    <Backdrop between>
      <IconButton variant="circle" title={previousTitle} onClick={goPrevious}>
        <ArrowBackIcon />
        <Hotkey {...KEY_ASSIGNMENT.goPrevIllust} onKeydown={goPrevious} />
      </IconButton>
      <IconButton variant="circle" title={nextTitle} onClick={goNext}>
        <ArrowForwardIcon />
        <Hotkey {...KEY_ASSIGNMENT.goNextIllust} onKeydown={goNext} />
      </IconButton>
    </Backdrop>
  )
}
