import * as CSS from '@stitches/core'
import { createStyled } from '@stitches/react'

export type { StitchesProps, StitchesVariants } from '@stitches/react'

export type StitchesConfig<C> = C extends CSS.TCss<infer T> ? T : never

export type Theme = typeof theme
export type Config = StitchesConfig<typeof css>

type Properties = CSS.Properties
type SpaceToken = keyof Theme['space']
type SizeToken = keyof Theme['sizes']
type TextToken = keyof typeof text
type Value = number | (string & {})

const theme = {
  sizes: {
    $smH: '48px',
    $mdH: '56px',
    $lgH: '64px',
  },
  space: {
    $0: '0px',
    $1: '4px',
    $2: '8px',
    $3: '16px',
    $4: '32px',
  },
  fonts: {
    $body:
      '"Roboto", "Noto Sans CJK JP", "Helvetica Neue", "arial", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
    $head:
      '"Roboto", "Noto Sans CJK JP", "Helvetica Neue", "arial", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
    $mono:
      '"Source Code Pro", SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  fontSizes: {
    $h1: '20px',
    $h2: '16px',
    $h3: '14px',
    $body: '14px',
    $caption: '12px',
    $button: '14px',
  },
  fontWeights: {
    $body: '400',
    $head: '600',
    $bold: '600',
  },
  lineHeights: {
    $body: '1.5',
    $head: '1.125',
    $caption: '1.67',
  },
  colors: {
    $text: '#202124',
    $bg: '#333',
    $surface: '#0b132b',
    $onSurface: '#fff',
    $primary: '#55cfff',
    $onPrimary: '#000',
    $secondary: '#f28d85',
    $onSecondary: '#000',
  },
}

const text = {
  $h1: {
    fontFamily: '$head',
    fontSize: '$h1',
    fontWeight: '$head',
    lineHeight: '$head',
    letterSpacing: 0.15,
  },
  $h2: {
    fontFamily: '$head',
    fontSize: '$h2',
    fontWeight: '$head',
    lineHeight: '$head',
    letterSpacing: 0.15,
  },
  $h3: {
    fontFamily: '$head',
    fontSize: '$h3',
    fontWeight: '$head',
    lineHeight: '$body',
    letterSpacing: 0.1,
  },
  $body: {
    fontFamily: '$body',
    fontSize: '$body',
    fontWeight: '$body',
    lineHeight: '$body',
    letterSpacing: 0.15,
  },
  $caption: {
    fontFamily: '$body',
    fontSize: '$caption',
    fontWeight: '$body',
    lineHeight: '$caption',
    letterSpacing: 0.4,
  },
  $button: {
    fontFamily: '$body',
    fontSize: '$button',
    fontWeight: '$head',
    lineHeight: 1,
    letterSpacing: 0.4,
  },
}

export const { styled, css } = createStyled({
  prefix: 'cfp',
  tokens: theme,
  utils: {
    cover: (value: SpaceToken | Properties['inset']) => ({
      position: 'absolute',
      inset: value,
    }),
    w: (value: SizeToken | Properties['width']) => ({
      width: value,
    }),
    h: (value: SizeToken | Properties['height']) => ({
      height: value,
    }),
    size: (value: SizeToken | Properties['width'] | Properties['height']) => ({
      width: value,
      height: value,
    }),
    marginX: (value: SpaceToken | Value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: SpaceToken | Value) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value: SpaceToken | Value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: SpaceToken | Value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    text: (value: TextToken) => text[value],
    ellipsis: (value: SizeToken | Properties['maxWidth']) => ({
      overflow: 'hidden',
      maxWidth: value,
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
      textOverflow: 'ellipsis',
    }),
  },
})

// Follow https://material.io/design/motion/speed.html#duration
// to learn when use what timing.
export const duration = {
  // Complexity level
  simple: '100ms',
  complex: '200ms',
  detail: '500ms',
  // Area
  smallIn: '150ms',
  smallOut: '75ms',
  mediumIn: '250ms',
  mediumOut: '200ms',
  largeIn: '300ms',
  largeOut: '250ms',
} as const

// Follow https://material.io/design/motion/speed.html#easing
// to learn the context in which each easing should be used.
export const easing = {
  /** Persistent element */
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Incoming element */
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  /** Outgoing element */
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
} as const
