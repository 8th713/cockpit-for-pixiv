import styled from 'styled-components'
import * as sys from 'styled-system'
import { em, EmProps, textOverflow, TextOverflowProps } from './Text'

export interface LinkProps
  extends sys.LayoutProps,
    sys.SpaceProps,
    sys.FlexboxProps,
    sys.GridProps,
    sys.ColorProps,
    sys.STextStyleProps,
    EmProps,
    TextOverflowProps {}

export const Link = styled.a<LinkProps>`
  cursor: pointer;
  box-sizing: border-box;
  min-width: 0;
  margin: 0;
  padding: 0;
  border-width: 0;
  background-color: transparent;
  font-family: Roboto, Helvetica Neue, arial, Noto Sans CJK JP,
    Hiragino Kaku Gothic ProN, Meiryo, sans-serif;
  :hover {
    text-decoration: none;
  }
  :focus {
    outline: auto currentColor;
  }
  ${sys.compose(
    sys.layout,
    sys.space,
    sys.flexbox,
    sys.grid,
    sys.color,
    sys.textStyle,
    em,
    textOverflow
  )}
`
Link.defaultProps = {
  color: 'primary'
}
