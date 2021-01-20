import React, { forwardRef } from 'react'
import { styled, StitchesProps, duration, easing } from '../stitches.config'
import { Paragraph } from './Text'

export type SwitchProps = StitchesProps<typeof Checkbox> & {}

const Root = styled('label', {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
  margin: 0,
  columnGap: '$2',
})

const CheckboxWrapper = styled('div', {
  boxSizing: 'border-box',
  position: 'relative',
  display: 'inline-flex',
  width: 58,
  height: 38,
  margin: 0,
  padding: 12,
  flexShrink: 0,
  '&[aria-disabled="true"]': {
    pointerEvents: 'none',
    opacity: 0.38,
  },
})

const Checkbox = styled('input', {
  appearance: 'none',
  cursor: 'pointer',
  boxSizing: 'border-box',
  cover: 0,
  zIndex: 1,
  width: '100%',
  margin: 0,
  outlineWidth: 0,
  ':disabled': {
    cursor: 'auto',
  },
})

const Track = styled('span', {
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  margin: 0,
  borderRadius: '7px',
  backgroundColor: '#fff',
  opacity: 0.3,
  transitionProperty: 'background-color',
  transitionDuration: duration.simple,
  transitionTimingFunction: easing.standard,
  'input:checked ~ &': {
    backgroundColor: '$primary',
  },
})

const Thumb = styled('span', {
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 0,
  padding: 9,
  color: '$onSurface',
  transitionProperty: 'color, transform',
  transitionDuration: duration.simple,
  transitionTimingFunction: easing.standard,
  'input:checked ~ &': {
    color: '$primary',
    transform: 'translateX(50%)',
  },
  '::before': {
    content: "''",
    boxSizing: 'inherit',
    display: 'flex',
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  '::after': {
    content: "''",
    boxSizing: 'inherit',
    cover: 0,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: duration.simple,
    transitionTimingFunction: easing.standard,
  },
  'input:hover ~ &::after': {
    opacity: 0.12,
  },
  'input:focus-visible ~ &::after': {
    opacity: 0.24,
  },
})

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ children, css, className, style, ...props }, ref) => (
    <Root>
      <CheckboxWrapper aria-disabled={props.disabled} css={css}>
        <Checkbox {...props} type="checkbox" ref={ref} />
        <Track />
        <Thumb />
      </CheckboxWrapper>
      <Paragraph
        css={{
          text: '$h2',
          fontWeight: 'normal',
        }}
      >
        {children}
      </Paragraph>
    </Root>
  )
)

if (__DEV__) {
  Root.displayName = 'Switch.Container'
  CheckboxWrapper.displayName = 'Switch.CheckboxWrapper'
  Checkbox.displayName = 'Switch.Checkbox'
  Track.displayName = 'Switch.Track'
  Thumb.displayName = 'Switch.Thumb'
}
