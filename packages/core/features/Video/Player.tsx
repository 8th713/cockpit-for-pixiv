import { useLayoutEffect } from 'react'
import { styled } from '../../stitches.config'
import { useFullscreen } from '../App/useFullscreen'
import { Toolbar } from './Toolbar'
import { usePlayer } from './usePlayer'

interface PlayerProps {
  fullscreenMode?: boolean
  frames: Pixiv.FrameAndImage[]
}

export function Player({ fullscreenMode, frames }: PlayerProps) {
  const { canvasRef, state, actions } = usePlayer(frames)
  const { index, paused } = state
  const [isFullscreen, toggleFullscreen] = useFullscreen()
  const { image } = frames[index]
  const ratio = `${image.width} / ${image.height}`

  useLayoutEffect(() => {
    if (isFullscreen) {
      if (fullscreenMode) {
        actions.play()
      } else {
        actions.stop()
      }
    } else {
      if (fullscreenMode) {
        actions.stop()
      } else {
        actions.play()
      }
    }
  }, [isFullscreen, actions])

  return (
    <>
      <Canvas
        ref={canvasRef}
        fullscreenMode={fullscreenMode}
        style={
          {
            '--cfp-ratio': ratio,
          } as any
        }
        onClick={(e) => {
          e.stopPropagation()
          toggleFullscreen()
        }}
      />
      <Toolbar
        index={index}
        max={frames.length}
        paused={paused}
        actions={actions}
      />
    </>
  )
}

const Canvas = styled('canvas', {
  pointerEvents: 'auto',
  cursor: 'zoom-in',
  objectFit: 'contain',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  minWidth: 0,
  minHeight: 0,
  aspectRatio: 'var(--cfp-ratio)',
  margin: 'auto',
  backgroundColor: 'rgba(255,255,255,0.32)',
  variants: {
    fullscreenMode: {
      true: {
        maxWidth: 'none',
        maxHeight: 'none',
      },
    },
  },
})
