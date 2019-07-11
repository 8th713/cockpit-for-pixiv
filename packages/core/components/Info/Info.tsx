import React from 'react'
import styled from 'styled-components'
import { Caption } from './Caption'
import { Description } from './Description'
import { User } from './User'
import { Box } from '../shared/Box'

export function Info() {
  return (
    <>
      <Caption />
      <Divider />
      <Box display="flex" p={3} alignItems="flex-start" bg="surface">
        <Description />
        <React.Suspense fallback={null}>
          <User />
        </React.Suspense>
      </Box>
    </>
  )
}

const Divider = styled.div`
  position: sticky;
  top: var(--caption-height);
  padding: 0 16px;
  background-color: var(--surface);
  ::after {
    content: '';
    display: block;
    height: 1px;
    background-color: var(--on-surface);
    opacity: 0.12;
  }
`
