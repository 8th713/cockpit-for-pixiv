import { styled } from '../stitches.config'
import { Progress } from './Progress'
import { ripple, useRipple } from './useRipple'

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof StyledButton> {
  loading?: boolean
}

export function Button({ loading, children, ...props }: ButtonProps) {
  const isDisabled = loading || props.disabled
  const onClick = useRipple(props.onClick)

  return (
    <StyledButton
      {...props}
      disabled={isDisabled}
      loading={loading}
      onClick={onClick}
    >
      {loading ? <Progress size="sm" /> : children}
    </StyledButton>
  )
}

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
  minWidth: 64,
  height: 36,
  border: 0,
  borderRadius: 18,
  paddingX: '$3',
  gap: '$2',
  textStyle: '$button',
  textAlign: 'center',
  textDecoration: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  transitions: 'opacity, background-color, color',
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
  '& > .ripple': {
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
    transform: 'scale(0)',
    animationName: ripple,
    animationDuration: '600ms',
    animationTimingFunction: 'linear',
  },
  '& > svg': {
    size: 18,
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: '$onPrimary',
      },
      secondary: {
        backgroundColor: '$secondary',
        color: '$onSecondary',
      },
      outlined: {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'currentColor',
        backgroundColor: 'transparent',
        color: '$primary',
      },
      inherit: {
        backgroundColor: 'transparent',
        color: '$primary',
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
  defaultVariants: {
    variant: 'inherit',
  },
})
