import styled from 'styled-components'
import { extend, sx, SxProps, themeGet } from './utils'

export interface DividerProps extends SxProps {}

export const Divider = styled.hr<DividerProps>(
  extend({
    width: 'initial',
    height: 'initial',
    minWidth: 1,
    minHeight: 1,
    flexGrow: 0,
    flexShrink: 0,
    m: 0,
    p: 0,
    border: 0,
    bg: 'onSurface',
    opacity: themeGet('opacities.divider')
  }),
  sx
)

if (__DEV__) {
  Divider.displayName = 'Divider'
}
