import { styled } from '../stitches.config'
import { typography } from './typography'

export type DlProps = React.ComponentProps<typeof Dl>
export type DtProps = React.ComponentProps<typeof Dt>
export type DdProps = React.ComponentProps<typeof Dd>

export const Dl = styled('section', {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
  marginBottom: '$2',
  columnGap: '$2',
})

export const Dt = styled('span', {
  boxSizing: 'border-box',
  display: 'inline-block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  ...typography.h3,
})

export const Dd = styled('span', {
  boxSizing: 'border-box',
  display: 'inline-block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  ...typography.body,
})

if (__DEV__) {
  Dl.displayName = 'Dl'
  Dt.displayName = 'Dt'
  Dd.displayName = 'Dd'
}
