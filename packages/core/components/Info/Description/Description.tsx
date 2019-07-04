import React from 'react'
import styled from 'styled-components'
import { Comment } from './Comment'
import { Series } from './Series'
import { Stats } from './Stats'
import { TagList } from './TagList'

export function Description() {
  return (
    <Root>
      <React.Suspense fallback={null}>
        <Comment />
        <TagList />
        <Series />
        <Stats />
      </React.Suspense>
    </Root>
  )
}

const Root = styled.div`
  all: unset;
  display: grid;
  gap: 24px;
  flex: 1 0;
`
