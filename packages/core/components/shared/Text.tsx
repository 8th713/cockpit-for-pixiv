import styled from 'styled-components'
import * as sys from '../system'
import { Box, BoxProps } from './Box'

export interface TextProps
  extends BoxProps,
    sys.STextStyleProps,
    sys.EmProps,
    sys.EllipsisProps {}

const getAs = ({ textStyle }: TextProps) => {
  switch (textStyle) {
    case 'h1':
    case 'h2':
    case 'h3':
      return { as: textStyle }
    case 'body1':
    case 'body2':
    case 'b1':
    case 'b2':
      return { as: 'p' }
    default:
      return { as: 'span' }
  }
}

export const Text = styled(Box).attrs(getAs)<TextProps>`
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: Roboto, Helvetica Neue, arial, Noto Sans CJK JP,
    Hiragino Kaku Gothic ProN, Meiryo, sans-serif;
  ${sys.compose(
    sys.textStyle,
    sys.em
  )};
  ${sys.ellipsis};
`
Text.displayName = 'Text'
Text.defaultProps = {
  textStyle: 'body1'
}
