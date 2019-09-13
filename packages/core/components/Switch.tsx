import React from 'react'
import styled from 'styled-components'
import * as sys from 'styled-system'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface SystemProps
  extends sys.PositionProps,
    sys.MarginProps,
    sys.FlexboxProps,
    sys.GridProps {}
type NativeProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'>
export type SwitchProps = SystemProps & NativeProps & { as?: never }

const Impl = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  props,
  ref
) {
  const { className, style, ...inputProps } = props
  const { disabled } = inputProps

  return (
    <div className={className} style={style} aria-disabled={disabled}>
      <Input ref={ref} {...inputProps} type="checkbox" />
      <Track />
      <Thumb />
    </div>
  )
})

export const Switch = styled(Impl)`
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  width: 58px;
  height: 38px;
  padding: 12px;
  flex: 0 0 auto;
  &[aria-disabled='true'] {
    pointer-events: none;
    opacity: var(--disabled);
  }
  ${sys.compose(
    sys.position,
    sys.margin,
    sys.flexbox,
    sys.grid
  )}
`

const Input = styled.input`
  appearance: none;
  cursor: pointer;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  outline: none;
  :disabled {
    cursor: auto;
  }
`
const Track = styled.span`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  transition: background-color 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 7px;
  background-color: #fff;
  input:checked ~ & {
    background-color: var(--primary);
  }
`
const Thumb = styled.span`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  padding: 9px;
  color: var(--on-surface);
  transition: color 100ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 100ms cubic-bezier(0.4, 0, 0.2, 1);
  ::before {
    content: '';
    box-sizing: border-box;
    display: flex;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: currentColor;
  }
  ::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
    opacity: 0;
    transition: opacity 15ms linear;
  }
  input:hover ~ & {
    &:after {
      opacity: var(--hovered);
    }
  }
  input:focus ~ & {
    &:after {
      opacity: var(--focused);
    }
  }
  input:active ~ & {
    &:after {
      opacity: var(--pressed);
    }
  }
  input:checked ~ & {
    color: var(--primary);
    transform: translateX(50%);
  }
`
