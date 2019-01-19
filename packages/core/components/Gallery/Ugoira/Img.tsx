import React from 'react'
import { AsyncStatus, Page } from '../../../interfaces'
import {
  PickerProvider,
  BoardProvider,
  FitProvider,
  SpreadProvider
} from '../../../contexts'
import { useUgoira } from '../../../hooks'
import { calcSize } from '../calcSize'
import { Player } from './Player'

type Props = {
  id: string
  page: Page
  children?: never
}

export function Img({ id, page }: Props) {
  const { result, retry } = useUgoira(id)
  const { goFromEvent } = PickerProvider.useAction()
  const board = BoardProvider.useValue()
  const fit = FitProvider.useValue()
  const spread = SpreadProvider.useValue()
  const { width, height } = calcSize(board, fit, spread, page)
  const styles = {
    width,
    height,
    transitionProperty: 'width, height',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    background: `no-repeat center/contain #fff url(${page.urls.small.replace(
      '540x540_70',
      '150x150'
    )})`
  }

  switch (result.status) {
    case AsyncStatus.Loading:
      return <canvas style={styles} onClick={goFromEvent} />
    case AsyncStatus.Failure:
      return <canvas style={styles} onClick={retry} />
    case AsyncStatus.Success: {
      const { value } = result

      return <Player frames={value} style={styles} onClick={goFromEvent} />
    }
  }
}
