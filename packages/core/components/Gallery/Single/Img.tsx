import React, { useContext } from 'react'
import { Page } from '../../../interfaces'
import {
  PickerProvider,
  BoardProvider,
  FitProvider,
  SpreadProvider
} from '../../../contexts'
import { useImg } from '../../../hooks'
import { calcSize } from '../calcSize'

type Props = {
  page: Page
  children?: never
}

export function Img({ page }: Props) {
  const { goFromEvent } = useContext(PickerProvider.ActionContext)
  const board = useContext(BoardProvider.ValueContext)
  const fit = useContext(FitProvider.ValueContext)
  const spread = useContext(SpreadProvider.ValueContext)
  const { width, height } = calcSize(board, fit, spread, page)
  const src = useImg(page)
  const styles = {
    width,
    height,
    backgroundColor: '#fff',
    transitionProperty: 'width, height',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
  }

  return (
    <img
      src={src}
      style={styles}
      width={width}
      height={height}
      onClick={goFromEvent}
    />
  )
}
