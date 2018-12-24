import styled, { css } from 'styled-components'
import { prop, switchProp } from 'styled-tools'
import { color, ripple } from '../theme'

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
    ${switchProp(prop('c', 'default'), containedColors)};
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

type Props = {
  c?: keyof typeof textColors
  v?: keyof typeof variants
  children?: React.ReactNode
}

export const Button = styled.button<Props>`
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
  color: ${switchProp(prop('c', 'default'), textColors)};
  ${switchProp(prop('v', 'text'), variants)};
  ${ripple};
`
