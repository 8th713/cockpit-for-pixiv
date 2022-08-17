import {
  createStitches,
  defaultThemeMap,
  PropertyValue,
  ScaleValue,
} from '@stitches/react'
import type * as Stitches from '@stitches/react'

export type CSS = Stitches.CSS<typeof config>

export const {
  styled,
  css,
  globalCss,
  keyframes,
  theme,
  config,
} = createStitches({
  prefix: 'cfp',
  themeMap: {
    ...defaultThemeMap,
    opacity: 'opacities',
  },
  theme: {
    colors: {
      surface: '#0b132b',
      onSurface: '#fff',
      primary: '#55cfff',
      onPrimary: '#000',
      secondary: '#f28d85',
      onSecondary: '#000',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '24px',
      5: '32px',
    },
    fontSizes: {
      h1: '20px',
      h2: '16px',
      h3: '14px',
      body: '14px',
      caption: '12px',
      button: '14px',
    },
    fonts: {
      sans:
        '"Roboto", "Noto Sans CJK JP", "Helvetica Neue", "arial", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
      mono:
        '"Source Code Pro", SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
    },
    fontWeights: {
      h1: 600,
      h2: 600,
      h3: 600,
      body: 400,
      caption: 400,
      button: 600,
      bold: '600',
    },
    lineHeights: {
      h1: 1.3,
      h2: 1.25,
      h3: 1.5,
      body: 1.5,
      caption: 1.67,
      button: 1,
    },
    letterSpacings: {
      h1: '0.0075em',
      h2: '0.00938em',
      h3: '0.00714em',
      body: '0.01071em',
      caption: '0.03333em',
      button: '0.02857em',
    },
    sizes: {
      sm: '48px',
      md: '56px',
      lg: '64px',
      full: '100%',
    },
    opacities: {
      hover: 0.12,
      focus: 0.24,
      disabled: 0.38,
      divider: 0.12,
      backdrop: 0.32,
    },
  },
  utils: {
    baseStyle: (value: boolean) => ({
      boxSizing: 'border-box' as any,
      minWidth: 0,
      margin: 0,
    }),
    textStyle: (value: ScaleValue<'fontSizes'>) => ({
      fontFamily: '$sans',
      fontSize: value,
      fontWeight: value,
      lineHeight: value,
      letterSpacing: value,
    }),
    linkStyle: (value: PropertyValue<'color'> | ScaleValue<'colors'>) => ({
      cursor: 'pointer',
      color: value,
      textDecorationLine: 'none',
      '&:focus': {
        outlineWidth: 1,
        outlineStyle: 'dotted',
        outlineColor: 'currentColor',
      },
    }),
    cover: (value: PropertyValue<'inset'> | ScaleValue<'space'>) => ({
      position: 'absolute' as any,
      inset: value,
    }),
    marginX: (value: PropertyValue<'marginLeft'> | ScaleValue<'space'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: PropertyValue<'marginTop'> | ScaleValue<'space'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value: PropertyValue<'paddingLeft'> | ScaleValue<'space'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: PropertyValue<'paddingTop'> | ScaleValue<'space'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    size: (value: PropertyValue<'width'> | ScaleValue<'space' | 'sizes'>) => ({
      width: value,
      height: value,
    }),
    transitions: (value: PropertyValue<'transitionProperty'>) => ({
      transitionProperty: value,
      transitionDuration: '100ms',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }),
  },
})
