import React, { useContext } from 'react'
import {
  BoardContext,
  FitProvider,
  PickerProvider,
  SpreadProvider
} from '../../../contexts'
import { useLazyImg, useVisibility } from '../../../hooks'
import { Page } from '../../../interfaces'
import { calcSize } from '../calcSize'

type Props = {
  page: Page
  children?: never
}

export function Img({ page }: Props) {
  const { goFromEvent } = PickerProvider.usePickerAction()
  const board = useContext(BoardContext)
  const { width, height } = calcSize(board.size, fit, spread, page, true)
  const [fit] = FitProvider.use()
  const [spread] = SpreadProvider.use()
  const [imgRef, inView] = useVisibility({
    root: board.node,
    rootMargin: '32px'
  })
  const src = useLazyImg(page, inView)
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
      ref={imgRef}
      src={src}
      style={styles}
      width={width}
      height={height}
      onClick={goFromEvent}
    />
  )
}
