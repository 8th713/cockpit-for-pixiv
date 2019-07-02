import React from 'react'
import styled from 'styled-components'
import { Caption } from './Caption'
import { Description } from './Description'
import { User } from './User'
import { IllustHost } from './IllustHost'
import { ToggleForm } from '../Bookmark'

type Props = {
  id: string
}

export function Info({ id }: Props) {
  return (
    <IllustHost id={id}>
      <ToggleForm id={id}>
        <Caption />
      </ToggleForm>
      <Divider />
      <Grid>
        <React.Suspense fallback={null}>
          <Description />
          <User />
        </React.Suspense>
      </Grid>
    </IllustHost>
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
