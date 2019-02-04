import styled, { css } from 'styled-components'
import { color, ripple } from '../theme'

type Props = {
  c?: keyof typeof textColors
  v?: keyof typeof variants
  children?: React.ReactNode
}

const textColors = {
  inherit: 'inherit',
  default: color.surfaceText,
  error: color.error,
  primary: color.primary,
  secondary: color.secondary
}

const containedColors = {
  inherit: css`
    background-color: inherit;
    color: inherit;
  `,
  default: css`
    background-color: ${color.surfaceText};
    color: ${color.surface};
  `,
  error: css`
    background-color: ${color.error};
    color: ${color.errorText};
  `,
  primary: css`
    background-color: ${color.primary};
    color: ${color.primaryText};
  `,
  secondary: css`
    background-color: ${color.secondary};
    color: ${color.secondaryText};
  `
}

const variants = {
  text: null,
  outlined: css`
    padding: 0 14px;
    border: 2px solid currentColor;
  `,
  contained: css`
    ${({ c = 'default' }: Props) => containedColors[c]};
    &:hover::before {
      opacity: 0.08;
    }
    &:focus::before {
      opacity: 0.24;
    }
    &:active::after {
      opacity: 0.32;
    }
  `,
  icon: css`
    min-width: 48px;
    height: 48px;
    margin: auto;
    padding: 12px;
    border-radius: 50%;
    & > svg {
      margin-left: 0;
      margin-right: 0;
    }
  `
}

export const Button = styled.button`
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
  padding: 0 16px;
  border-radius: 18px;
  -webkit-font-smoothing: antialiased;
  font-family: 'Roboto', 'Helvetica Neue', 'arial', 'Noto Sans CJK JP',
    'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
  font-size: 0.875em;
  line-height: 2.25em;
  font-weight: 500;
  letter-spacing: 0.08929em;
  text-decoration: none;
  text-transform: uppercase;
  color: ${({ c = 'default' }: Props) => textColors[c]};
  ${({ v = 'text' }: Props) => variants[v]};
  ${ripple};
`
