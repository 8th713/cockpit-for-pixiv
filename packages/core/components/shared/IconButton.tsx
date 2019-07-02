import styled from 'styled-components'

type Color = 'primary' | 'secondary' | 'error'

type Props = {
  color?: Color
}

export const IconButton = styled.button.attrs((props: Props) => ({
  'data-color': props.color
}))<Props>`
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
  width: 48px;
  height: 48px;
  padding: 12px;
  border: 0;
  border-radius: 50%;
  background-color: transparent;
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
  &:hover::before {
    opacity: var(--hovered);
  }
  &:focus::before {
    opacity: var(--focused);
  }
  &:active::before {
    opacity: var(--pressed);
  }

  &:not([data-color]) {
    color: inherit;
    opacity: var(--high);
  }
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
    cursor: default;
    pointer-events: none;
    color: var(--on-surface);
    opacity: var(--disabled);
  }
`
