import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { createTransition } from './transitions'
import { extend, sx, SxProps, themeGet } from './utils'

type InputProps = React.ComponentPropsWithoutRef<'input'>

export interface SwitchProps extends InputProps, SxProps {
  type?: never
  children?: never
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ sx, className, style, ...props }, ref) => (
    <Root
      aria-disabled={props.disabled}
      className={className}
      style={style}
      sx={sx}
    >
      <Checkbox {...props} ref={ref} />
      <Track />
      <Thumb />
    </Root>
  )
)

const Root = styled.div<SxProps>(
  extend({
    boxSizing: 'border-box',
    position: 'relative',
    display: 'inline-flex',
    width: 58,
    height: 38,
    p: '12px',
    flexShrink: 0,
    '&[aria-disabled="true"]': {
      pointerEvents: 'none',
      opacity: themeGet('opacities.disabled')
    }
  }),
  sx
)

const Checkbox = styled.input(
  extend({
    WebkitAppearance: 'none',
    cursor: 'pointer',
    outlineWidth: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    m: 0,
    ':disabled': {
      cursor: 'auto'
    }
  })
)
Checkbox.defaultProps = {
  type: 'checkbox'
}

const Track = styled.span(
  extend({
    width: '100%',
    height: '100%',
    borderRadius: '7px',
    bg: '#fff',
    opacity: 0.3,
    transition: createTransition('background-color'),
    'input:checked ~ &': {
      bg: 'primary'
    }
  })
)

const Thumb = styled.span(
  extend({
    position: 'absolute',
    top: 0,
    left: 0,
    p: '9px',
    color: 'onSurface',
    transition: createTransition(['color', 'transform']),
    'input:checked ~ &': {
      color: 'primary',
      transform: 'translateX(50%)'
    },
    '::before': {
      content: "''",
      boxSizing: 'inherit',
      display: 'flex',
      width: 20,
      height: 20,
      borderRadius: '50%',
      backgroundColor: 'currentColor'
    },
    '::after': {
      content: "''",
      boxSizing: 'inherit',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      backgroundColor: 'currentColor',
      opacity: 0,
      transition: 'opacity 15ms linear'
    },
    'input:hover ~ &::after': {
      opacity: themeGet('opacities.hover')
    },
    'input:focus ~ &::after': {
      opacity: themeGet('opacities.focus')
    }
  })
)

if (__DEV__) {
  Switch.displayName = 'Switch'
  Root.displayName = 'Switch.Root'
  Checkbox.displayName = 'Switch.Checkbox'
  Track.displayName = 'Switch.Track'
  Thumb.displayName = 'Switch.Thumb'
}
