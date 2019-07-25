import React from 'react'
import styled from 'styled-components'
import { Box } from '../shared'
import { Caption } from './Caption'
import { Description } from './Description'
import { Related } from './Related'
import { User } from './User'

export function Info() {
  return (
    <>
      <Caption />
      <Divider />
      <Box display="flex" p={3} alignItems="flex-start" bg="surface">
        <Description />
        <Box pr={3} flexGrow={1} />
        <React.Suspense fallback={null}>
          <User />
        </React.Suspense>
      </Box>
      <Box bg="surface">
        <React.Suspense fallback={null}>
          <Related />
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
