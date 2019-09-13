import React from 'react'
import styled from 'styled-components'
import * as sys from 'styled-system'
import { Text } from './Text'

interface SystemProps
  extends sys.MarginProps,
    sys.FlexboxProps,
    sys.GridProps,
    sys.SButtonStyleProps,
    sys.SColorStyleProps {}
type NativeProps = React.ComponentPropsWithoutRef<'button'>
export type ButtonProps = SystemProps & NativeProps

const Impl = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref
) {
  const { children, ...buttonProps } = props

  return (
    <button ref={ref} {...buttonProps}>
      <Label textStyle="button">{children}</Label>
    </button>
  )
})

export const Button = styled(Impl)`
  --multiplier: 1;
  --overlay-color: currentColor;
  all: unset;
  cursor: pointer;
  user-select: none;
  outline: none;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  z-index: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 64px;
  height: 36px;
  padding: 6px 16px;
  border-radius: 18px;
  background-color: transparent;
  color: inherit;
  transition: background-color 15ms linear, color 15ms linear;
  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--overlay-color);
    opacity: 0;
    transition: opacity 15ms linear;
  }
  &:disabled {
    cursor: default;
    pointer-events: none;
  }
  &:hover::before {
    opacity: calc(var(--hovered) * var(--multiplier));
  }
  &:focus::before {
    opacity: calc(var(--focused) * var(--multiplier));
  }
  &:active::before {
    opacity: calc(var(--pressed) * var(--multiplier));
  }
  ${sys.compose(
    sys.margin,
    sys.flexbox,
    sys.grid,
    sys.buttonStyle,
    sys.colorStyle
  )}
  & + & {
    margin-left: 8px;
  }
`
Button.defaultProps = {
  variant: 'text'
}

const Label = styled(Text)`
  pointer-events: none;
  box-sizing: border-box;
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
  opacity: var(--text-opacity, var(--high));
  button:disabled > & {
    opacity: var(--disabled);
  }
`
