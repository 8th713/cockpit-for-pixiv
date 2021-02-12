import React, { MouseEvent, useRef } from 'react'
import {
  css,
  StitchesProps,
  styled,
  duration,
  easing,
} from '../stitches.config'

export type ButtonProps = StitchesProps<typeof Root>

const Root = styled('button', {
  cursor: 'pointer',
  appearance: 'none',
  outlineWidth: 0,
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 64,
  height: 36,
  border: '0',
  borderRadius: 18,
  paddingX: '$3',
  gap: '$2',
  backgroundColor: '$primary',
  color: '$onPrimary',
  textAlign: 'center',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  fontFamily: 'inherit',
  text: '$button',
  transitionProperty: 'opacity, background-color, color',
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
    backgroundColor: '#fff',
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
  '& > svg': {
    size: 18,
  },
  '& > .ripple': {
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
    transform: 'scale(0)',
    animationName: css.keyframes({ to: { transform: 'scale(4)', opacity: 0 } }),
    animationDuration: '600ms',
    animationTimingFunction: 'linear',
  },
  variants: {
    variant: {
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
  },
})

export const Button = (props: ButtonProps) => {
  const circleRef = useRef<HTMLSpanElement | null>(null)
  const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()

    if (circleRef.current === null) {
      circleRef.current = document.createElement('span')
      circleRef.current.classList.add('ripple')
    } else {
      circleRef.current.remove()
    }

    const circle = circleRef.current
    const diameter = Math.max(rect.width, rect.height)
    const radius = diameter / 2

    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${e.clientX - rect.left - radius}px`
    circle.style.top = `${e.clientY - rect.top - radius}px`
    button.appendChild(circle)
    props.onClick && props.onClick(e)
  }
  return <Root {...props} onClick={createRipple} />
}

if (__DEV__) {
  Root.displayName = 'Button.Inner'
}
