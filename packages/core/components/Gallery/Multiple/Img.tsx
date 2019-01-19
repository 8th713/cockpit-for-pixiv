import React from 'react'
import { Page, AsyncStatus } from '../../../interfaces'
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
  const status = useLazyImg(page.urls.original, entry)
  const styles = {
    width,
    height,
    backgroundColor: '#fff',
    transitionProperty: 'width, height',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
  }

  switch (status) {
    case AsyncStatus.Loading:
    case AsyncStatus.Failure:
      return (
        <img
          ref={imgRef}
          src={page.urls.small.replace('540x540_70', '150x150')}
          style={styles}
          width={width}
          height={height}
          onClick={goFromEvent}
        />
      )
    case AsyncStatus.Success:
      return (
        <img
          ref={imgRef}
          src={page.urls.original}
          style={styles}
          width={width}
          height={height}
          onClick={goFromEvent}
        />
      )
  }
}
