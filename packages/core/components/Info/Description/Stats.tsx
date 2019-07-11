import React from 'react'
import styled from 'styled-components'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { Box } from '../../shared/Box'
import { BookmarkOn, DateTime, Like, ViewCount } from '../../shared/Icon'
import { Text } from '../../shared/Text'

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleString('ja-JP', {
    hour12: false,
    year: 'numeric',
    month: 'narrow',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

export function Stats() {
  const { useIllust } = useServices()
  const id = useRoute()[0]!
  const illust = useIllust(id)

  if (!illust) return null

  const { likeCount, bookmarkCount, viewCount, uploadDate } = illust

  return (
    <Box display="flex" flexWrap="wrap" alignItems="center">
      <Score textStyle="b2">
        <Like width="18" height="18" mr={2} />
        {likeCount}
      </Score>
      <Score textStyle="b2">
        <BookmarkOn width="18" height="18" mr={2} />
        {bookmarkCount}
      </Score>
      <Score textStyle="b2">
        <ViewCount width="18" height="18" mr={2} />
        {viewCount}
      </Score>
      <Score textStyle="b2">
        <DateTime width="18" height="18" mr={2} />
        {formatDate(uploadDate)}
      </Score>
    </Box>
  )
}

const Score = styled(Text)`
  display: flex;
  white-space: nowrap;
  align-items: center;
  & + & {
    margin-left: 8px;
  }
`
