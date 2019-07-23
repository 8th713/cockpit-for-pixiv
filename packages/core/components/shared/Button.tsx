import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import * as sys from '../system'
import { Text } from './Text'

interface SystemProps
  extends sys.MarginProps,
    sys.FlexItemProps,
    sys.GridItemProps,
    sys.SButtonStyleProps {
  colors?: sys.StrictResponsiveValue<
    sys.ValueOf<DefaultTheme, 'buttonColorStyles'>
  >
}
type NativeProps = React.ComponentPropsWithoutRef<'button'>
export type ButtonProps = SystemProps & NativeProps

const Impl = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, ...buttonProps } = sys.omitSystemProps(props)

  return (
    <button ref={ref} {...buttonProps}>
      <Label textStyle="button">{children}</Label>
    </button>
  )
})
if (process.env.NODE_ENV !== 'production') {
  Impl.displayName = 'Button'
}

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
    sys.variant({
      key: 'buttonColorStyles',
      prop: 'colors'
    })
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
