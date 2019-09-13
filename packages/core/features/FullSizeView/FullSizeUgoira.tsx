import React from 'react'
import styled from 'styled-components'
import { usePlayer, useUgoira } from '../Ugoira'
import { FullSizeImg } from './FullSizeImg'

interface Props extends Pixiv.Page {
  illustId: string
}
interface LoaderProps extends Props {}
interface SuccessProps extends Pixiv.Page {
  frames: Pixiv.FrameAndImage[]
}

export const FullSizeUgoira = (props: Props) => (
  <React.Suspense fallback={<FullSizeImg {...props} />}>
    <FullSizeUgoiraLoader {...props} />
  </React.Suspense>
)
const FullSizeUgoiraLoader = ({ illustId, ...page }: LoaderProps) => {
  const frames = useUgoira(illustId)

  if (!frames) return <FullSizeImg {...page} />
  return <FullSizeUgoiraSuccess {...page} frames={frames} />
}
const FullSizeUgoiraSuccess = ({ urls, frames, ...rest }: SuccessProps) => {
  const [ref] = usePlayer(frames)

  return <Canvas key={urls.original} ref={ref} {...rest} />
}

const Canvas = styled.canvas`
  display: block;
  background-color: rgba(255, 255, 255, var(--high));
`
