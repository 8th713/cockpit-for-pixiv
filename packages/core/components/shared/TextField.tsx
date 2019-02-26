import React from 'react'
import styled from 'styled-components'
import { color, opacity } from '../theme'

type Props = React.ComponentPropsWithoutRef<'input'> & {
  invalid?: boolean
  children?: React.ReactNode
}

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { children, invalid, ...rest } = props

    return (
      <Box>
        <Input
          ref={ref}
          type="text"
          placeholder=" "
          {...rest}
          aria-invalid={invalid}
        />
        <Label>{children}</Label>
        <Line />
        <Overlay />
      </Box>
    )
  }
)

const Box = styled.label`
  position: relative;
  overflow: hidden;
  display: block;
  width: 100%;
  height: 56px;
  border-radius: 8px 8px 0 0;
  font-family: 'Roboto', 'Helvetica Neue', 'arial', sans-serif;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5em;
  letter-spacing: 0.03125em;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: currentColor;
    opacity: 0.14;
  }
`
const Input = styled.input`
  && {
    all: unset;
    cursor: auto;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    padding: 12px 12px 0;
    color: ${color.surfaceText};
    font: inherit;

    &::placeholder {
      color: ${color.surfaceText2};
      opacity: 0;
      transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    &:focus {
      outline: none;
      background: unset;
      &::placeholder {
        opacity: 1;
      }
    }
    &:disabled {
      opacity: ${opacity.disabled};
    }
  }
`
const Label = styled.div`
  pointer-events: none;
  user-select: none;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  margin-top: 19px;
  border: 0;
  padding: 0 12px;
  background-color: transparent;
  color: ${color.surfaceText2};
  transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);

  input:not(:placeholder-shown) ~ &,
  input:focus ~ & {
    margin-top: 6px;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.25rem;
    letter-spacing: 0.03333em;
  }
  input:focus ~ & {
    color: ${color.primary};
  }
  input:required ~ &::after {
    content: '*';
  }
  input[aria-invalid='true'] ~ & {
    color: ${color.error};
  }
  input:disabled ~ & {
    opacity: ${opacity.disabled};
  }
`
const Line = styled.div`
  pointer-events: none;
  user-select: none;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2px;
  /* basic line */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: ${color.surfaceText};
    opacity: ${opacity.disabled};
  }
  /* color line */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: ${color.primary};
    transform: scale(0);
    transform-origin: 50%;
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  input:hover ~ &::before {
    opacity: 1;
  }
  input:focus ~ &::after {
    transform: scale(1);
  }
  input[aria-invalid='true'] ~ &::before,
  input[aria-invalid='true'] ~ &::after {
    background-color: ${color.error};
  }
  input:disabled ~ & {
    opacity: 0;
  }
`
const Overlay = styled.div`
  pointer-events: none;
  user-select: none;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: currentColor;
  opacity: 0;

  input:hover ~ &,
  input:focus ~ & {
    opacity: 0.04;
  }
  input:disabled ~ & {
    opacity: 0;
  }
`
