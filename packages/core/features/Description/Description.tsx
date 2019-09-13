import React from 'react'
import { Box } from '../../components'
import { Comment } from './Comment'
import { Series } from './Series'
import { Stats } from './Stats'
import { TagList } from './TagList'

export const Description = () => (
  <Box display="grid" gridGap={3}>
    <React.Suspense fallback={null}>
      <Comment />
      <TagList />
      <Series />
      <Stats />
    </React.Suspense>
  </Box>
)
