import styled from 'styled-components'
import { Text } from './Text'

export const Chip = styled(Text)`
  user-select: none;
  display: inline-flex;
  min-width: 88px;
  padding: 4px 16px;
  border-radius: 16px;
  background-color: #616161;
  color: #fff;
  white-space: nowrap;
  justify-content: center;
`
Chip.defaultProps = {
  textStyle: 'caption'
}
