import { forwardRef } from 'react'
import { styled } from '../../stitches.config'

export interface WorkButtonProps {
  work: Pixiv.SimpleIllust
  disabled?: boolean
  onClick: (illustId: string) => void
}

export const WorkButton = forwardRef<HTMLButtonElement, WorkButtonProps>(
  function WorkButton({ work, disabled, onClick }, forwardedRef) {
    return (
      <Button
        ref={forwardedRef}
        disabled={disabled}
        onClick={() => onClick(work.id)}
      >
        <Img
          width="168"
          height="168"
          loading="lazy"
          src={work.url}
          alt={work.title}
          title={work.title}
        />
        <Tip>{getChipText(work)}</Tip>
      </Button>
    )
  }
)

const Button = styled('button', {
  appearance: 'none',
  cursor: 'zoom-in',
  baseStyle: true,
  position: 'relative',
  overflow: 'hidden',
  display: 'block',
  width: 168,
  height: 168,
  flexShrink: 0,
  padding: 0,
  borderWidth: 0,
  outlineWidth: 0,
  '&:disabled': {
    cursor: 'default',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    pointerEvents: 'none',
    boxSizing: 'inherit',
    cover: 0,
    borderRadius: 'inherit',
    backgroundColor: '#fff',
    opacity: 0,
    transitions: 'opacity',
  },
  '&:hover::after': {
    opacity: '$hover',
  },
  '&:focus-visible::after': {
    opacity: '$focus',
  },
  '&:disabled::after': {
    opacity: '$disabled',
  },
})

const Img = styled('img', {
  objectFit: 'contain',
  baseStyle: true,
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
  backgroundColor: 'rgba(255,255,255,0.32)',
})

const Tip = styled('div', {
  baseStyle: true,
  position: 'absolute',
  top: 0,
  right: 0,
  paddingX: '$2',
  borderBottomLeftRadius: 4,
  backgroundColor: 'rgba(0,0,0,0.38)',
  color: '$onSurface',
  '&:empty': {
    display: 'none',
  },
})

function getChipText({ pageCount, illustType }: Pixiv.SimpleIllust) {
  return pageCount !== 1 ? pageCount : illustType === 2 ? 'U' : null
}
