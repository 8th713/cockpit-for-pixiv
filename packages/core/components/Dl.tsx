import styled from 'styled-components'
import { TextProps } from './Text'
import { ComponentSet, extend, sx, SxProps, themeRef } from './utils'

export interface DlProps extends SxProps {}

type DlType = ComponentSet<
  'section',
  DlProps,
  {
    Dt: typeof Dt
    Dd: typeof Dd
  }
>

export const Dl: DlType = styled.div<DlProps>(
  extend({
    display: 'flex',
    alignItems: 'center',
    mb: 2
  }),
  sx
) as any

const Dt = styled.span<TextProps>(
  extend({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }),
  themeRef('text'),
  sx
)
Dt.defaultProps = {
  variant: 'h3'
}
Dl.Dt = Dt

const Dd = styled.span<TextProps>(
  extend({
    ml: 3,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }),
  themeRef('text'),
  sx
)
Dd.defaultProps = {
  variant: 'body2'
}
Dl.Dd = Dd

if (__DEV__) {
  Dl.displayName = 'Dl'
  Dt.displayName = 'Dl.Header'
  Dd.displayName = 'Dl.Content'
}
