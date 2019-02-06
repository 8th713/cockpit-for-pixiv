import React from 'react'
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
  const { goFromEvent } = PickerProvider.useAction()
  const board = BoardProvider.useValue()
  const fit = FitProvider.useValue()
  const spread = SpreadProvider.useValue()
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
