import { CSS, styled } from '../stitches.config'
import { forwardRef } from 'react'
import { Progress } from './Progress'
import { ripple, useRippleLite } from './useRipple'
import { VariantProps } from '@stitches/react'

export interface IconButtonProps
  extends React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof StyledButton> {
  loading?: boolean
  css?: CSS
}

export interface IconLinkProps
  extends React.ComponentPropsWithoutRef<'a'>,
    VariantProps<typeof StyledButton> {
  css?: CSS
}

export function IconButton({ loading, children, ...props }: IconButtonProps) {
  const isDisabled = loading || props.disabled
  const onClick = useRippleLite(props.onClick)

  return (
    <StyledButton
      {...props}
      disabled={isDisabled}
      loading={loading}
      onClick={onClick}
    >
      {loading ? <Progress size="md" /> : children}
    </StyledButton>
  )
}

export const IconLink = forwardRef<HTMLAnchorElement, IconLinkProps>(
  function IconLink(props, ref) {
    const onClick = useRippleLite(props.onClick)

    return <StyledButton as="a" ref={ref} {...props} onClick={onClick} />
  }
)

const StyledButton = styled('button', {
  cursor: 'pointer',
  appearance: 'none',
  userSelect: 'none',
  pointerEvents: 'auto',
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  size: 48,
  minWidth: 0,
  margin: 0,
  borderWidth: 0,
  borderRadius: '50%',
  backgroundColor: 'transparent',
  color: 'inherit',
  textAlign: 'center',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transitions: 'opacity',
  outlineWidth: 0,
  '&:disabled': {
    pointerEvents: 'none',
    cursor: 'default',
    opacity: '$disabled',
  },
  '&::after': {
    content: '""',
    pointerEvents: 'none',
    boxSizing: 'inherit',
    cover: 0,
    borderRadius: 'inherit',
    backgroundColor: 'currentColor',
    opacity: 0,
    transitions: 'opacity',
  },
  '&:hover::after': {
    opacity: '$hover',
  },
  '&:focus-visible::after': {
    opacity: '$focus',
  },
  '& > .ripple': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
    transform: 'scale(0)',
    animationName: ripple,
    animationDuration: '600ms',
    animationTimingFunction: 'linear',
  },
  variants: {
    variant: {
      primary: {
        color: '$primary',
      },
      secondary: {
        color: '$secondary',
      },
      circle: {
        position: 'sticky',
        top: 'calc(50vh - $sizes$md)',
        backgroundColor: 'rgba(11, 19, 43, 0.08)',
        color: '$onSurface',
        '&::after': {
          color: '#000',
        },
      },
    },
    loading: {
      true: {
        '&:disabled': {
          opacity: 1,
        },
      },
    },
  },
})
