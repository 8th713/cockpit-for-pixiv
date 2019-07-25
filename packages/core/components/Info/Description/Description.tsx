import React from 'react'
import { Box } from '../../shared'
import { Comment } from './Comment'
import { Series } from './Series'
import { Stats } from './Stats'
import { TagList } from './TagList'

export function Description() {
  return (
    <Box display="grid" gridGap={3} flex="960px" maxWidth={960}>
      <React.Suspense fallback={null}>
        <Comment />
        <TagList />
        <Series />
        <Stats />
      </React.Suspense>
    </Box>
  )
}
