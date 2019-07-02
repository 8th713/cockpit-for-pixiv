import React from 'react'
import styled from 'styled-components'
import { Frame, Page } from '../../../interfaces'
import { usePlayer } from '../usePlayer'

type Props = Page & {
  frames: Frame[]
}

export function FullSizePlayer({ urls, frames, ...rest }: Props) {
  const [ref] = usePlayer(frames)

  return <Canvas key={urls.original} ref={ref} {...rest} />
}

const Canvas = styled.canvas`
  cursor: pointer;
  display: block;
  background-color: rgba(255, 255, 255, var(--high));
`
