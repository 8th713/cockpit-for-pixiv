import React from 'react'
import {
  BoardProvider,
  FitProvider,
  PickerProvider,
  SpreadProvider
} from '../../../contexts'
import { useImg } from '../../../hooks'
import { Page } from '../../../interfaces'
import { calcSize } from '../calcSize'

type Props = {
  page: Page
  children?: never
}

export function Img({ page }: Props) {
  const { actions } = PickerProvider.use()
  const [, size] = BoardProvider.use()
  const [fit] = FitProvider.use()
  const [spread] = SpreadProvider.use()
  const { width, height } = calcSize(size, fit, spread, page)
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
      onClick={actions.goFromEvent}
    />
  )
}
