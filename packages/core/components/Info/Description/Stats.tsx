import React from 'react'
import styled from 'styled-components'
import { BookmarkOn, DateTime, Like, ViewCount } from '../../shared/Icon'
import { Text } from '../../shared/Text'
import { useIllust } from '../IllustHost'

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
  const { read } = useIllust()
  const illust = read()

  if (!illust) return null

  const { likeCount, bookmarkCount, viewCount, uploadDate } = illust

  return (
    <Root>
      <Score kind="b2">
        <Like width="18" height="18" />
        <SpaceText>{likeCount}</SpaceText>
      </Score>
      <Score kind="b2">
        <BookmarkOn width="18" height="18" />
        <SpaceText>{bookmarkCount}</SpaceText>
      </Score>
      <Score kind="b2">
        <ViewCount width="18" height="18" />
        <SpaceText>{viewCount}</SpaceText>
      </Score>
      <Score kind="b2">
        <DateTime width="18" height="18" />
        <SpaceText>{formatDate(uploadDate)}</SpaceText>
      </Score>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`

const Score = styled(Text)`
  display: flex;
  align-items: center;
  white-space: nowrap;
  & + & {
    margin-left: 8px;
  }
`

const SpaceText = styled.span`
  margin-left: 8px;
`
