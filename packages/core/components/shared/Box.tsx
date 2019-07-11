import styled from 'styled-components'
import * as sys from '../system'

export interface BoxProps
  extends sys.SpaceProps,
    sys.ColorProps,
    sys.LayoutProps,
    sys.FlexboxProps,
    sys.GridProps {}

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  min-width: 0;
  margin: 0;
  padding: 0;
  border-width: 0;
  :focus {
    outline-color: currentColor;
  }
  ${sys.compose(
    sys.space,
    sys.color,
    sys.layout,
    sys.flexbox,
    sys.grid
  )}
`
Box.displayName = 'Box'
