import { styled } from '../stitches.config'

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof BadgeContainer> {
  max?: number
  children?: number | string
}

export function Badge({ children, max, ...props }: BadgeProps) {
  const content = !max ? children : `${children} / ${max}`

  return <BadgeContainer {...props}>{content}</BadgeContainer>
}

const BadgeContainer = styled('div', {
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
  textStyle: '$body',
  whiteSpace: 'nowrap',
})
