import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import { Frame, Page } from '../../../interfaces'
import { useRouteActions } from '../../Router'
import { Pause, Play, Stop } from '../../shared/Icon'
import { IconButton } from '../../shared/IconButton'
import { Text } from '../../shared/Text'
import { useFullSizeMode } from '../FullSizeMode'
import { usePlayer } from '../usePlayer'

type Props = Page & {
  frames: Frame[]
}

export function Player({ urls, frames, ...rest }: Props) {
  const { go } = useRouteActions()
  const [fullSizeMode] = useFullSizeMode()
  const [ref, { index, paused }, dispatch] = usePlayer(frames)

  useLayoutEffect(() => {
    if (fullSizeMode) {
      dispatch({ type: 'rewind' })
    }
  }, [fullSizeMode, dispatch])

  return (
    <Layout onClick={e => e.stopPropagation()}>
      <Canvas
        key={urls.original}
        ref={ref}
        {...rest}
        onClick={e => go(e.shiftKey ? -1 : 1)}
      />
      <PlayControl>
        <IconButton onClick={() => dispatch({ type: 'toggle' })}>
          {paused ? <Play /> : <Pause />}
        </IconButton>
        <IconButton onClick={() => dispatch({ type: 'rewind' })}>
          <Stop />
        </IconButton>
        <Count kind="caption">
          {index + 1}/{frames.length}
        </Count>
      </PlayControl>
    </Layout>
  )
}

const Layout = styled.div`
  position: relative;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  background-color: rgba(255, 255, 255, var(--high));
`
const Canvas = styled.canvas`
  cursor: pointer;
  display: block;
  max-width: 100%;
  max-height: 100%;
`
const PlayControl = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: min-content min-content 1fr;
  align-items: center;
  height: 56px;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, var(--medium));
  color: var(--on-surface);
  opacity: 0;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover,
  &:focus-within {
    opacity: 1;
  }
`
const Count = styled(Text)`
  justify-self: end;
  padding: 0 16px;
`
