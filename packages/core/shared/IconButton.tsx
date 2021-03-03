import { StitchesVariants } from '@stitches/react'
import { forwardRef, useRef } from 'react'
import { keyframes, styled } from '../stitches.config'
import { duration, easing } from './animation'
import { ForwardRefComponent } from './forwardRefWithAs'

export type IconButtonProps = React.ComponentProps<typeof IconButton>
type VariantsProps = StitchesVariants<typeof Root>

const Root = styled('button', {
  appearance: 'none',
  userSelect: 'none',
  pointerEvents: 'auto',
  outlineWidth: 0,
  boxSizing: 'border-box',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  minWidth: 0,
  margin: 0,
  borderWidth: 0,
  borderRadius: '50%',
  backgroundColor: 'transparent',
  color: 'inherit',
  textAlign: 'center',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transitionProperty: 'opacity',
  transitionDuration: duration.simple,
  transitionTimingFunction: easing.standard,
  '&:disabled': {
    pointerEvents: 'none',
    cursor: 'default',
    opacity: 0.38,
  },
  '&::after': {
    content: '""',
    pointerEvents: 'none',
    boxSizing: 'inherit',
    cover: 0,
    borderRadius: 'inherit',
    backgroundColor: 'currentColor',
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: duration.simple,
    transitionTimingFunction: easing.standard,
  },
  '&:hover::after': {
    opacity: 0.12,
  },
  '&:focus-visible::after': {
    opacity: 0.24,
  },
  '& > .ripple': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
    transform: 'scale(0)',
    animationName: keyframes({ to: { transform: 'scale(4)', opacity: 0 } }),
    animationDuration: '600ms',
    animationTimingFunction: 'linear',
  },
  variants: {
    circle: {
      true: {
        position: 'sticky',
        backgroundColor: 'rgba(11, 19, 43, 0.08)',
        color: '$onSurface',
        '&::after': {
          color: '#000',
        },
        '& > .ripple': {
          backgroundColor: 'rgba(0, 0, 0, 0.24)',
        },
      },
    },
    color: {
      primary: {
        color: '$primary',
      },
      secondary: {
        color: '$secondary',
      },
    },
  },
})

export const IconButton = forwardRef(function IconButton(props, forwardedRef) {
  const circleRef = useRef<HTMLSpanElement | null>(null)

  return (
    <Root
      {...props}
      ref={forwardedRef}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget

        if (circleRef.current === null) {
          circleRef.current = document.createElement('span')
          circleRef.current.classList.add('ripple')
        } else {
          circleRef.current.remove()
        }

        button.appendChild(circleRef.current)
        props.onClick && props.onClick(e)
      }}
    />
  )
}) as ForwardRefComponent<typeof Root, VariantsProps>

if (__DEV__) {
  Root.displayName = 'IconButton.Root'
}
