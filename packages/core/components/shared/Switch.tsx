import React from 'react'
import styled from 'styled-components'

type Props = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'>

export const Switch = React.forwardRef<HTMLInputElement, Props>(function Switch(
  props,
  ref
) {
  const { className, ...rest } = props
  const { disabled } = rest

  return (
    <Root aria-disabled={disabled} className={className}>
      <Input ref={ref} {...rest} type="checkbox" />
      <Track />
      <Thumb />
    </Root>
  )
})

const Root = styled.span`
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  width: 58px;
  height: 38px;
  flex-shrink: 0;
  padding: 12px;
  &[aria-disabled='true'] {
    pointer-events: none;
    opacity: var(--disabled);
  }
`
const Input = styled.input`
  appearance: none;
  cursor: pointer;
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
  width: 100%;
  height: 100%;
  opacity: 0.54;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 7px;
  background-color: #fff;
  input:checked ~ & {
    background-color: var(--primary);
  }
`
const Thumb = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  padding: 9px;
  color: var(--on-surface);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  ::before {
    content: '';
    display: flex;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: currentColor;
  }
  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
    opacity: 0;
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
