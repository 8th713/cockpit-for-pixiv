import { IconButton } from '../../shared/IconButton'
import { PauseIcon, PlayIcon, StopIcon } from '../../shared/Icons'
import { styled } from '../../stitches.config'

export interface ToolbarProps {
  index: number
  paused: boolean
  max: number
  actions: {
    pause: () => void
    stop: () => void
    play: () => void
  }
}

export function Toolbar({ index, paused, max, actions }: ToolbarProps) {
  return (
    <ToolbarContainer
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <IconButton
        onClick={(e) => {
          e.stopPropagation()
          actions.pause()
        }}
      >
        {paused ? <PlayIcon /> : <PauseIcon />}
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.stopPropagation()
          actions.stop()
        }}
      >
        <StopIcon />
      </IconButton>
      <Spacer />
      <span>
        {index + 1} / {max}
      </span>
    </ToolbarContainer>
  )
}

const ToolbarContainer = styled('div', {
  pointerEvents: 'auto',
  boxSizing: 'border-box',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '$md',
  paddingX: '$2',
  paddingY: '$1',
  backgroundColor: 'rgba(0, 0, 0, .6)',
  color: '$onSurface',
  opacity: 0,
  '&:hover,&:focus-within': {
    opacity: 1,
  },
})

const Spacer = styled('div', {
  flexGrow: 1,
})
