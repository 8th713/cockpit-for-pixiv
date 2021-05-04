import { Properties } from '@stitches/core/types/css-types'
import { createCss } from '@stitches/react'

type CssValue = Properties<0 | (string & {})>
// @ts-ignore
type Token<T> = `$${keyof T}`

const stitches = createCss({
  prefix: 'cfp',
  theme: {
    sizes: {
      smH: '48px',
      mdH: '56px',
      lgH: '64px',
      full: '100%',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '32px',
    },
    fonts: {
      body:
        '"Roboto", "Noto Sans CJK JP", "Helvetica Neue", "arial", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
      head:
        '"Roboto", "Noto Sans CJK JP", "Helvetica Neue", "arial", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
      mono:
        '"Source Code Pro", SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
    },
    fontSizes: {
      h1: '20px',
      h2: '16px',
      h3: '14px',
      body: '14px',
      caption: '12px',
      button: '14px',
    },
    fontWeights: {
      body: '400',
      head: '600',
      bold: '600',
    },
    lineHeights: {
      body: '1.5',
      head: '1.125',
      caption: '1.67',
    },
    colors: {
      text: '#202124',
      bg: '#333',
      surface: '#0b132b',
      onSurface: '#fff',
      primary: '#55cfff',
      onPrimary: '#000',
      secondary: '#f28d85',
      onSecondary: '#000',
    },
  },
  utils: {
    cover: ({ theme }) => (
      value: Token<typeof theme.space> | CssValue['inset']
    ) => ({
      position: 'absolute',
      inset: value,
    }),
    marginX: ({ theme }) => (
      value: Token<typeof theme.space> | CssValue['marginLeft']
    ) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: ({ theme }) => (
      value: Token<typeof theme.space> | CssValue['marginTop']
    ) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: ({ theme }) => (
      value: Token<typeof theme.space> | CssValue['paddingLeft']
    ) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: ({ theme }) => (
      value: Token<typeof theme.space> | CssValue['paddingTop']
    ) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    size: ({ theme }) => (
      value: Token<typeof theme.sizes> | CssValue['width']
    ) => ({
      width: value,
      height: value,
    }),
  },
})

export const { css, styled, global, keyframes } = stitches
