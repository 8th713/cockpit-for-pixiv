import styled from 'styled-components'
import { Box } from './Box'

export const Divider = styled(Box)`
  flex: 0 0 1px;
  background-color: var(--on-surface);
  opacity: var(--divider);
`
Divider.defaultProps = {
  mx: 24
}
