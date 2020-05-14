import React from 'react'
import styled from 'styled-components'
import { extend } from '../../components'
import { usePlayer, useUgoira } from '../Ugoira'
import { FullSizeImg } from './FullSizeImg'

interface Props extends Pixiv.Page {
  illustId: string
}

interface SuccessProps extends Pixiv.Page {
  frames: Pixiv.FrameAndImage[]
}

export const FullSizeUgoira = (props: Props) => (
  <React.Suspense fallback={<FullSizeImg {...props} />}>
    <Loader {...props} />
  </React.Suspense>
)

const Loader = ({ illustId, ...page }: Props) => {
  const frames = useUgoira(illustId)

  if (!frames) return <FullSizeImg {...page} />
  return <Success {...page} frames={frames} />
}

const Success = ({ urls, frames, ...rest }: SuccessProps) => {
  const [ref] = usePlayer(frames)

  return <Canvas key={urls.original} ref={ref} {...rest} />
}

const Canvas = styled.canvas(
  extend({
    display: 'block',
    bg: 'rgba(255, 255, 255, 0.87)'
  })
)

if (__DEV__) {
  Loader.displayName = 'FullSizeUgoira.Loader'
  Success.displayName = 'FullSizeUgoira.Success'
  Canvas.displayName = 'FullSizeUgoira.Canvas'
}
