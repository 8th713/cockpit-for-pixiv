import React from 'react'
import { Page, AsyncStatus } from '../../../interfaces'
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

export const Img = React.memo(function Img({ page }: Props) {
  const { goFromEvent } = PickerProvider.useAction()
  const board = BoardProvider.useValue()
  const fit = FitProvider.useValue()
  const spread = SpreadProvider.useValue()
  const { width, height } = calcSize(board, fit, spread, page)
  const status = useImg(page.urls.original)
  const styles = {
    width,
    height,
    backgroundColor: '#fff',
    transitionProperty: 'width, height',
    transitionDuration: '200ms'
  }

  switch (status) {
    case AsyncStatus.Loading:
    case AsyncStatus.Failure:
      return (
        <img
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
          src={page.urls.original}
          style={styles}
          width={width}
          height={height}
          onClick={goFromEvent}
        />
      )
  }
})
