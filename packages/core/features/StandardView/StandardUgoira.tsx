import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import {
  IconButton,
  PauseIcon,
  PlayIcon,
  StopIcon,
  Text
} from '../../components'
import { useFullSizeMode } from '../FullSizeView'
import { useRouteActions, useRouteId } from '../Router'
import { usePlayer, useUgoira } from '../Ugoira'
import { StandardImg } from './StandardImg'

interface SuspenseProps extends Pixiv.Page {}
interface LoaderProps extends Pixiv.Page {}
interface SuccessProps extends Pixiv.Page {
  frames: Pixiv.FrameAndImage[]
}

export const StandardUgoira = (props: SuspenseProps) => {
  return (
    <React.Suspense fallback={<StandardImg {...props} />}>
      <UgoiraLoader {...props} />
    </React.Suspense>
  )
}
const UgoiraLoader = (props: LoaderProps) => {
  const id = useRouteId()
  const frames = useUgoira(id)
  if (!frames) return <StandardImg {...props} />
  return <UgoiraSuccess {...props} frames={frames} />
}
const UgoiraSuccess = ({ urls, frames, ...rest }: SuccessProps) => {
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
          {paused ? <PlayIcon /> : <PauseIcon />}
        </IconButton>
        <IconButton onClick={() => dispatch({ type: 'rewind' })}>
          <StopIcon />
        </IconButton>
        <Text p={3} textStyle="caption" justifySelf="flex-end">
          {index + 1}/{frames.length}
        </Text>
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
  height: 56px;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, var(--medium));
  color: var(--on-surface);
  opacity: 0;
  grid-template-columns: min-content min-content 1fr;
  align-items: center;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover,
  &:focus-within {
    opacity: 1;
  }
`
