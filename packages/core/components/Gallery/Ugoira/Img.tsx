import React from 'react'
import { Page } from '../../../interfaces'
import { BoardProvider, FitProvider, SpreadProvider } from '../../../contexts'
import { useUgoira } from '../../../hooks'
import { calcSize } from '../calcSize'
import { Player } from './Player'

type Props = {
  id: string
  page: Page
  children?: never
}

export function Img({ id, page }: Props) {
  const { read, retry } = useUgoira(id)
  const handleRetry = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      retry()
    },
    [retry]
  )
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

  try {
    const frames = read()
    return <Player frames={frames} style={styles} />
  } catch (error) {
    if (error && error.then) {
      throw error
    }
    return <canvas style={styles} onClick={handleRetry} />
  }
}
