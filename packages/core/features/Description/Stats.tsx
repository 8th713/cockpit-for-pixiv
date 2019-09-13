import React from 'react'
import styled from 'styled-components'
import {
  BookmarkOnIcon,
  Box,
  DateTimeIcon,
  LikeIcon,
  Text,
  ViewCountIcon
} from '../../components'
import { useIllust } from '../Illust'
import { useRouteId } from '../Router'

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleString('ja-JP', {
    hour12: false,
    year: 'numeric',
    month: 'narrow',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

export const Stats = () => {
  const id = useRouteId()
  const illust = useIllust(id)

  if (!illust) return null

  const { likeCount, bookmarkCount, viewCount, uploadDate } = illust

  return (
    <Box display="flex" flexWrap="wrap" alignItems="center">
      <Score textStyle="b2">
        <LikeIcon width="18" height="18" mr={2} />
        {likeCount}
      </Score>
      <Score textStyle="b2">
        <BookmarkOnIcon width="18" height="18" mr={2} />
        {bookmarkCount}
      </Score>
      <Score textStyle="b2">
        <ViewCountIcon width="18" height="18" mr={2} />
        {viewCount}
      </Score>
      <Score textStyle="b2">
        <DateTimeIcon width="18" height="18" mr={2} />
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
