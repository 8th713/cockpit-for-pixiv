import React from 'react'
import { Page } from '../../../interfaces'
import {
  PickerProvider,
  BoardProvider,
  FitProvider,
  SpreadProvider
} from '../../../contexts'
import { useIntersection, useLazyImg } from '../../../hooks'
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
  const { width, height } = calcSize(board, fit, spread, page, true)
  const imgRef = React.useRef(null)
  const entry = useIntersection(imgRef, {
    root: board.ref.current,
    rootMargin: '32px'
  })
  const src = useLazyImg(page, entry)
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
