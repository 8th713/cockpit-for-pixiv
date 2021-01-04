import { IStyledComponent } from '@stitches/react'
import React, { forwardRef, MouseEvent, useRef } from 'react'
import {
  Config,
  css,
  duration,
  easing,
  StitchesProps,
  styled,
} from '../stitches.config'

export type IconButtonProps = StitchesProps<typeof Root>
export type IconLinkProps = StitchesProps<IStyledComponent<'a', {}, Config>>

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
  ':disabled': {
    pointerEvents: 'none',
    cursor: 'default',
    opacity: 0.38,
  },
  '::after': {
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
    animationName: css.keyframes({ to: { transform: 'scale(4)', opacity: 0 } }),
    animationDuration: '600ms',
    animationTimingFunction: 'linear',
  },
  variants: {
    variant: {
      circle: {
        position: 'sticky',
        backgroundColor: 'rgba(11, 19, 43, 0.08)',
        color: '$onSurface',
        '::after': {
          color: '#000',
        },
        '& > .ripple': {
          backgroundColor: 'rgba(0, 0, 0, 0.24)',
        },
      },
    },
  },
})

export const IconButton = (props: IconButtonProps) => {
  const circleRef = useRef<HTMLSpanElement | null>(null)
  const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget

    if (circleRef.current === null) {
      circleRef.current = document.createElement('span')
      circleRef.current.classList.add('ripple')
    } else {
      circleRef.current.remove()
    }

    button.appendChild(circleRef.current)
    props.onClick && props.onClick(e)
  }

  return <Root {...props} onClick={createRipple} />
}

export const IconLink = forwardRef<HTMLAnchorElement, IconLinkProps>(
  (props, ref) => {
    const circleRef = useRef<HTMLSpanElement | null>(null)
    const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget

      if (circleRef.current === null) {
        circleRef.current = document.createElement('span')
        circleRef.current.classList.add('ripple')
      } else {
        circleRef.current.remove()
      }

      button.appendChild(circleRef.current)
      props.onClick && props.onClick(e as any)
    }

    // @ts-ignore
    return <Root {...props} as="a" ref={ref as any} onClick={createRipple} />
  }
)

if (__DEV__) {
  Root.displayName = 'IconButton.Inner'
}
