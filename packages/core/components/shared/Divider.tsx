import styled from 'styled-components'
import { withProp } from 'styled-tools'
import { color } from '../theme'

type Props = {
  m?: number
  children?: never
}

export const Divider = styled.hr<Props>`
  all: unset;
  display: block;
  min-height: 1px;
  margin: 0 ${withProp('m', (m = 0) => `${m}px`)};
  background-color: ${color.divider};
`
