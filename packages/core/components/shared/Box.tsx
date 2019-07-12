import styled from 'styled-components'
import * as sys from '../system'

export interface BoxProps
  extends sys.PositionProps,
    sys.LayoutProps,
    sys.SpaceProps,
    sys.FlexboxProps,
    sys.GridProps,
    sys.ColorProps {}

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
    sys.position,
    sys.layout,
    sys.space,
    sys.flexbox,
    sys.grid,
    sys.color
  )}
`
Box.displayName = 'Box'
