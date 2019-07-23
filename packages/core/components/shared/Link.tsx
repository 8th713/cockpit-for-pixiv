import styled from 'styled-components'
import * as sys from '../system'

export interface LinkProps
  extends sys.LayoutProps,
    sys.SpaceProps,
    sys.FlexboxProps,
    sys.GridProps,
    sys.ColorProps,
    sys.STextStyleProps,
    sys.EmProps,
    sys.EllipsisProps {}

export const Link = styled.a<LinkProps>`
  &&& {
    cursor: pointer;
    box-sizing: border-box;
    min-width: 0;
    margin: 0;
    padding: 0;
    border-width: 0;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
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
      sys.em
    )}
    ${sys.ellipsis};
  }
`
Link.defaultProps = {
  color: 'primary'
}
if (process.env.NODE_ENV !== 'production') {
  Link.displayName = 'Link'
}
