import styled from 'styled-components'
import { Box } from './Box'

export const Divider = styled(Box)`
  flex: 0 0 1px;
  margin: 0 24px;
  background-color: var(--on-surface);
  opacity: var(--divider);
`
if (process.env.NODE_ENV !== 'production') {
  Divider.displayName = 'Divider'
}
