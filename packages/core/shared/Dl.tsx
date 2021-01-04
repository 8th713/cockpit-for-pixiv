import { StitchesProps, styled } from '../stitches.config'

export type DlProps = StitchesProps<typeof Dl>
export type DtProps = StitchesProps<typeof Dt>
export type DdProps = StitchesProps<typeof Dd>

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
  text: '$h3',
})

export const Dd = styled('span', {
  boxSizing: 'border-box',
  display: 'inline-block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  text: '$body',
})

if (__DEV__) {
  Dl.displayName = 'Dl'
  Dt.displayName = 'Dt'
  Dd.displayName = 'Dd'
}
