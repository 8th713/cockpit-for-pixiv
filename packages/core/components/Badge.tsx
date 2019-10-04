import styled from 'styled-components'
import { extend, sx, SxProps } from './utils'

export interface BadgeProps extends SxProps {}

export const Badge = styled.div<BadgeProps>(
  extend({
    userSelect: 'none',
    display: 'inline-flex',
    justifyContent: 'center',
    minWidth: 28,
    px: 2,
    py: 1,
    borderRadius: 16,
    backgroundColor: '#808080',
    color: '#fff',
    whiteSpace: 'nowrap',
    variant: 'text.caption'
  }),
  sx
)

if (__DEV__) {
  Badge.displayName = 'Badge'
}
