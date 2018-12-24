import React from 'react'
import styled from 'styled-components'
import { color, opacity } from '../../theme'
import { usePlayer } from '../../../hooks'
import { Button } from '../../shared/Button'
import { Text } from '../../shared/Text'
import { Play, Pause, Stop } from '../../shared/Icon'

type Frames = {
  image: HTMLImageElement
  delay: number
  file: string
}[]

type Props = {
  onClick: (event: React.MouseEvent<Element>) => void
  style: React.CSSProperties
  frames: Frames
  children?: never
}

export const Player = React.memo(function Player({
  onClick,
  style,
  frames
}: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const palyer = usePlayer(canvasRef, frames)
  function handleClick(event: React.MouseEvent) {
    event.stopPropagation()
  }

  return (
    <Layout style={style} onClick={onClick}>
      <Canvas ref={canvasRef} />
      <PlayControl onClick={handleClick}>
        <Button v="icon" onClick={palyer.toggle}>
          {palyer.paused ? <Play /> : <Pause />}
        </Button>
        <Button v="icon" onClick={palyer.rewind}>
          <Stop />
        </Button>
        <Count v="caption">
          {palyer.index + 1}/{frames.length}
        </Count>
      </PlayControl>
    </Layout>
  )
})

const Layout = styled.div`
  position: relative;
`
const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background-color: #fff;
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
  background-color: rgba(0, 0, 0, ${opacity.medium});
  color: ${color.surfaceText};
  opacity: 0;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  ${Layout}:hover > &,
  ${Layout}:focus-within > & {
    opacity: 1;
  }
`
const Count = styled(Text)`
  justify-self: end;
  padding: 0 16px;
`
