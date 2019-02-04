import styled from 'styled-components'
import { color } from '../theme'

type Props = {
  m?: number
  children?: never
}

export const Divider = styled.hr`
  all: unset;
  display: block;
  min-height: 1px;
  margin: 0 ${({ m = 0 }: Props) => `${m}px`};
  background-color: ${color.divider};
`
