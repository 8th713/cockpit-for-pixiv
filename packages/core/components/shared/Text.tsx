import styled, { css } from 'styled-components'
import { switchProp, prop, ifProp } from 'styled-tools'
import { color } from '../theme'

const colors = {
  inherit: 'inherit',
  default: color.surfaceText,
  error: color.error,
  primary: color.primary,
  secondary: color.secondary,
  textSecondary: color.surfaceText2
}

const variants = {
  h1: css`
    font-size: 6em;
    font-weight: 300;
    line-height: 6em;
    letter-spacing: -0.01562em;
  `,
  h2: css`
    font-size: 3.75em;
    font-weight: 300;
    line-height: 3.75em;
    letter-spacing: -0.00833em;
  `,
  h3: css`
    font-size: 3em;
    font-weight: 400;
    line-height: 3.125em;
    letter-spacing: normal;
  `,
  h4: css`
    font-size: 2.125em;
    font-weight: 400;
    line-height: 2.5em;
    letter-spacing: 0.00735em;
  `,
  h5: css`
    font-size: 1.5em;
    font-weight: 400;
    line-height: 2em;
    letter-spacing: normal;
  `,
  h6: css`
    font-size: 1.25em;
    font-weight: 500;
    line-height: 2em;
    letter-spacing: 0.0125em;
  `,
  s1: css`
    font-size: 1em;
    font-weight: 400;
    line-height: 1.75em;
    letter-spacing: 0.00937em;
  `,
  s2: css`
    font-size: 0.875em;
    font-weight: 500;
    line-height: 1.375em;
    letter-spacing: 0.00714em;
  `,
  b1: css`
    font-size: 1em;
    font-weight: 400;
    line-height: 1.5em;
    letter-spacing: 0.03125em;
  `,
  b2: css`
    font-size: 0.875em;
    font-weight: 400;
    line-height: 1.25em;
    letter-spacing: 0.01786em;
  `,
  button: css`
    font-size: 0.875em;
    font-weight: 500;
    line-height: 2.25em;
    letter-spacing: 0.08929em;
    text-decoration: none;
    text-transform: uppercase;
  `,
  caption: css`
    font-size: 0.75em;
    font-weight: 400;
    line-height: 1.25em;
    letter-spacing: 0.03333em;
  `,
  overline: css`
    font-size: 0.75em;
    font-weight: 400;
    line-height: 2em;
    letter-spacing: 0.16667em;
    text-decoration: none;
    text-transform: uppercase;
  `
}

type Props = {
  a?: 'inherit' | 'left' | 'right' | 'center' | 'justify'
  c?: keyof typeof colors
  v?: keyof typeof variants
  noWrap?: boolean
  children?: React.ReactNode
}

export const Text = styled.div<Props>`
  all: unset;
  display: block;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: 'Roboto', 'Helvetica Neue', 'arial', 'Noto Sans CJK JP',
    'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
  text-align: ${prop('a', 'inherit')};
  color: ${switchProp(prop('c', 'default'), colors)};
  ${switchProp(prop('v', 'b1'), variants)}
  ${ifProp(
    'noWrap',
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `
  )};
`
