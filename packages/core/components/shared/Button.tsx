import React from 'react'
import styled from 'styled-components'
import * as styles from './styles'

type Color = 'primary' | 'secondary' | 'error'
type Kind = 'text' | 'contained' | 'outlined'

type Props = React.ComponentPropsWithoutRef<'button'> & {
  color?: Color
  kind?: Kind
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  function Button(
    { color = 'primary', kind = 'text', children, ...props },
    ref
  ) {
    return (
      <Root ref={ref} {...props} data-color={color} data-kind={kind}>
        <span>{children}</span>
      </Root>
    )
  }
)

const Root = styled.button`
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
  font-family: inherit;
  ${styles.fontPresets.button};
  text-decoration: none;
  background-color: transparent;
  color: inherit;
  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    opacity: var(--enabled);
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  &:disabled {
    cursor: default;
    pointer-events: none;
  }
  &:hover::before {
    opacity: var(--hovered);
  }
  &:focus::before {
    opacity: var(--focused);
  }
  &:active::before {
    opacity: var(--pressed);
  }
  & > span {
    width: 100%;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
  }
  &:disabled > span {
    opacity: var(--disabled);
  }

  &[data-kind='text'] {
    padding: 6px 8px;
    &[data-color='primary'] {
      color: var(--primary);
    }
    &[data-color='secondary'] {
      color: var(--secondary);
    }
    &[data-color='error'] {
      color: var(--error);
    }
    &:disabled {
      color: var(--on-surface);
    }
  }
  &[data-kind='outlined'] {
    &[data-color='primary'] {
      color: var(--primary);
    }
    &[data-color='secondary'] {
      color: var(--secondary);
    }
    &[data-color='error'] {
      color: var(--error);
    }
    &:disabled {
      color: var(--on-surface);
    }
    /* outline */
    &::after {
      content: '';
      box-sizing: border-box;
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid currentColor;
      border-radius: inherit;
    }
    &:disabled::after {
      opacity: var(--divider);
    }
  }
  &[data-kind='contained'] {
    &[data-color='primary'] {
      background-color: var(--primary);
      color: var(--on-primary);
    }
    &[data-color='secondary'] {
      background-color: var(--secondary);
      color: var(--on-secondary);
    }
    &[data-color='error'] {
      background-color: var(--error);
      color: var(--on-error);
    }
    &::before {
      background-color: var(--on-surface);
    }
    &::after {
      content: '';
      box-sizing: border-box;
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }
    /* outline */
    &:focus::after {
      border: 2px solid var(--on-surface);
    }
    &:disabled {
      background-color: transparent;
      color: var(--on-surface);
    }
    /* overlay */
    &:disabled::after {
      background-color: var(--on-surface);
      opacity: var(--divider);
    }
  }

  & + & {
    margin-left: 8px;
  }
`
