import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import {
  createTransition,
  duration,
  extend,
  IconButton,
  PauseIcon,
  PlayIcon,
  StopIcon,
  Text
} from '../../components'
import { useFullSizeMode } from '../FullSizeView'
import { useRouteId } from '../Router'
import { usePlayer, useUgoira } from '../Ugoira'
import { StandardImg } from './StandardImg'

interface SuccessProps extends Pixiv.Page {
  frames: Pixiv.FrameAndImage[]
}

export const StandardUgoira = (props: Pixiv.Page) => (
  <React.Suspense fallback={<StandardImg {...props} />}>
    <Loader {...props} />
  </React.Suspense>
)

const Loader = (props: Pixiv.Page) => {
  const id = useRouteId()
  const frames = useUgoira(id)
  if (!frames) return <StandardImg {...props} />
  return <Success {...props} frames={frames} />
}

const Success = ({ urls, frames, ...rest }: SuccessProps) => {
  const [isFullSize, setFullSize] = useFullSizeMode()
  const [ref, { index, paused }, dispatch] = usePlayer(frames)

  useLayoutEffect(() => {
    if (isFullSize) {
      dispatch({ type: 'rewind' })
    } else {
      dispatch({ type: 'play' })
    }
  }, [isFullSize, dispatch])

  return (
    <Layout onClick={e => e.stopPropagation()}>
      <Canvas
        key={urls.original}
        ref={ref}
        {...rest}
        onClick={() => setFullSize(true)}
      />
      <PlayControl>
        <IconButton onClick={() => dispatch({ type: 'toggle' })}>
          {paused ? <PlayIcon /> : <PauseIcon />}
        </IconButton>
        <IconButton onClick={() => dispatch({ type: 'rewind' })}>
          <StopIcon />
        </IconButton>
        <Text variant="caption" sx={{ ml: 'auto', p: 3 }}>
          {index + 1}/{frames.length}
        </Text>
      </PlayControl>
    </Layout>
  )
}

const Layout = styled.div(
  extend({
    position: 'relative',
    maxWidth: '100%',
    maxHeight: '100%',
    m: 'auto',
    bg: 'rgba(255, 255, 255, .87)'
  })
)

const Canvas = styled.canvas(
  extend({
    cursor: 'zoom-in',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  })
)

const PlayControl = styled.div(
  extend({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'grid',
    gridTemplateColumns: 'min-content min-content 1fr',
    alignItems: 'center',
    height: 56,
    px: 2,
    py: 1,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    color: 'onSurface',
    opacity: 0,
    transition: createTransition('opacity', {
      duration: duration.smallIn
    }),
    '&:hover,&:focus-within': {
      opacity: 1
    }
  })
)

if (__DEV__) {
  Loader.displayName = 'StandardUgoira.Loader'
  Success.displayName = 'StandardUgoira.Success'
  Layout.displayName = 'StandardUgoira.Layout'
  Canvas.displayName = 'StandardUgoira.Canvas'
  PlayControl.displayName = 'StandardUgoira.PlayControl'
}
