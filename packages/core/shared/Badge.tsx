import { styled } from '../stitches.config'
import { typography } from './typography'

export type BadgeProps = React.ComponentProps<typeof Badge>

export const Badge = styled('div', {
  userSelect: 'none',
  boxSizing: 'border-box',
  display: 'inline-flex',
  justifyContent: 'center',
  minWidth: 28,
  margin: 0,
  paddingX: '$2',
  paddingY: '$1',
  borderRadius: 16,
  backgroundColor: '#808080',
  color: '#fff',
  whiteSpace: 'nowrap',
  ...typography.caption,
})

if (__DEV__) {
  Badge.displayName = 'Badge'
}
