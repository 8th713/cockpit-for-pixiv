import React from 'react'
import styled from 'styled-components'
import { useServices } from '../../Services'
import { usePlayer } from '../usePlayer'
import { FullSizeImg } from './FullSizeImg'

interface Props extends Pixiv.Page {
  id: string
}
interface SuspenseProps extends Props {}
interface LoaderProps extends Props {}
interface SuccessProps extends Pixiv.Page {
  frames: Pixiv.FrameAndImage[]
}

export function FullSizeUgoira(props: SuspenseProps) {
  return (
    <React.Suspense fallback={<FullSizeImg {...props} />}>
      <FullSizeUgoiraLoader {...props} />
    </React.Suspense>
  )
}
function FullSizeUgoiraLoader({ id, ...page }: LoaderProps) {
  const { useUgoira } = useServices()
  const frames = useUgoira(id)

  if (!frames) return <FullSizeImg {...page} />
  return <FullSizeUgoiraSuccess {...page} frames={frames} />
}
function FullSizeUgoiraSuccess({ urls, frames, ...rest }: SuccessProps) {
  const [ref] = usePlayer(frames)

  return <Canvas key={urls.original} ref={ref} {...rest} />
}

const Canvas = styled.canvas`
  display: block;
  background-color: rgba(255, 255, 255, var(--high));
`
