import styled from 'styled-components'
import { extend, sx, SxProps } from './utils'

export interface BoxProps extends SxProps {}

export const Box = styled.div<BoxProps>(extend({}), sx)

export const Flex = styled.div<BoxProps>(extend({ display: 'flex' }), sx)

export const Grid = styled.div<BoxProps>(extend({ display: 'grid' }), sx)

if (__DEV__) {
  Box.displayName = 'Box'
  Flex.displayName = 'Flex'
  Grid.displayName = 'Grid'
}
