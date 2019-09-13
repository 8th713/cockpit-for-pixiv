import styled from 'styled-components'
import * as sys from 'styled-system'

interface SystemProps extends sys.MarginProps {}
type NativeProps = React.ComponentPropsWithoutRef<'button'>
export type IconButtonProps = SystemProps & NativeProps

export const IconButton = styled.button<IconButtonProps>`
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
  margin: 0;
  padding: 12px;
  border: 0;
  border-radius: 50%;
  background-color: transparent;
  color: inherit;
  opacity: var(--high);
  ::before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    opacity: 0;
    transition: opacity 15ms linear;
  }
  :hover {
    ::before {
      opacity: var(--hovered);
    }
  }
  :focus {
    ::before {
      opacity: var(--focused);
    }
  }
  :active {
    ::before {
      opacity: var(--pressed);
    }
  }
  :disabled {
    cursor: default;
    pointer-events: none;
    color: var(--on-surface);
    opacity: var(--disabled);
  }
  ${sys.margin}
`
