import React from 'react'
import styled from 'styled-components'
import { Caption } from './Caption'
import { Description } from './Description'
import { User } from './User'

export function Info() {
  return (
    <>
      <Caption />
      <Divider />
      <Grid>
        <Description />
        <React.Suspense fallback={null}>
          <User />
        </React.Suspense>
      </Grid>
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
const Grid = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  background-color: var(--surface);
`
