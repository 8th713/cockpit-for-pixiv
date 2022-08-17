import { forwardRef } from 'react'
import { styled } from '../stitches.config'

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchCheckbox> {}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { children, ...props },
  forwardedRef
) {
  return (
    <SwitchContainer>
      <SwitchSwitch aria-disabled={props.disabled}>
        <SwitchCheckbox {...props} type="checkbox" ref={forwardedRef} />
        <SwitchTrack />
        <SwitchThumb />
      </SwitchSwitch>
      <SwitchLabel>{children}</SwitchLabel>
    </SwitchContainer>
  )
})

const SwitchContainer = styled('label', {
  userSelect: 'none',
  baseStyle: true,
  display: 'flex',
  alignItems: 'center',
  columnGap: '$2',
})

const SwitchLabel = styled('div', {
  baseStyle: true,
  textStyle: '$h2',
  fontWeight: 'normal',
})

const SwitchSwitch = styled('div', {
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
    opacity: '$disabled',
  },
})

const SwitchCheckbox = styled('input', {
  appearance: 'none',
  cursor: 'pointer',
  boxSizing: 'border-box',
  cover: 0,
  zIndex: 1,
  width: '100%',
  margin: 0,
  outlineWidth: 0,
  '&:disabled': {
    cursor: 'auto',
  },
})

const SwitchTrack = styled('span', {
  boxSizing: 'border-box',
  size: '100%',
  margin: 0,
  borderRadius: '7px',
  backgroundColor: '#fff',
  opacity: 0.3,
  transitions: 'background-color',
  'input:checked ~ &': {
    backgroundColor: '$primary',
  },
})

const SwitchThumb = styled('span', {
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 0,
  padding: 9,
  color: '$onSurface',
  transitions: 'color, transform',
  'input:checked ~ &': {
    color: '$primary',
    transform: 'translateX(50%)',
  },
  '&::before': {
    content: "''",
    boxSizing: 'inherit',
    display: 'flex',
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  '&::after': {
    content: "''",
    boxSizing: 'inherit',
    cover: 0,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    opacity: 0,
    transitions: 'opacity',
  },
  'input:hover ~ &::after': {
    opacity: '$hover',
  },
  'input:focus-visible ~ &::after': {
    opacity: '$focus',
  },
})
