import { StitchesProps, styled } from '../stitches.config'

export type BadgeProps = StitchesProps<typeof Badge>

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
  text: '$caption',
})

if (__DEV__) {
  Badge.displayName = 'Badge'
}
