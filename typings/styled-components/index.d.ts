import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      surface: string
      onSurface: string
      primary: string
      onPrimary: string
      secondary: string
      onSecondary: string
      error: string
      onError: string
    }
    colorStyles: {
      primary: CSSObject
      secondary: CSSObject
      error: CSSObject
    }
    textStyles: {
      h1: CSSObject
      h2: CSSObject
      h3: CSSObject
      body1: CSSObject
      body2: CSSObject
      button: CSSObject
      caption: CSSObject
      overline: CSSObject
      b1: CSSObject
      b2: CSSObject
    }
    buttons: {
      text: CSSObject
      outlined: CSSObject
      contained: CSSObject
    }
    buttonColorStyles: {
      primary: CSSObject
      secondary: CSSObject
      error: CSSObject
    }
  }
}
