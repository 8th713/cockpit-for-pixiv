import React from 'react'
import styled from 'styled-components'
import { Illust } from '../../../interfaces'
import { BookmarkOn, DateTime, Like, ViewCount } from '../../shared/Icon'
import { Text } from '../../shared/Text'

type Props = {
  illust: Illust
  children?: never
}

export function Stats({ illust }: Props) {
  const { likeCount, bookmarkCount, viewCount, uploadDate } = illust

  return (
    <Text v="b2">
      <Score>
        <Like width="18" height="18" />
        {likeCount}
      </Score>
      <Score>
        <BookmarkOn width="18" height="18" />
        {bookmarkCount}
      </Score>
      <Score>
        <ViewCount width="18" height="18" />
        {viewCount}
      </Score>
      <Score>
        <DateTime width="18" height="18" />
        {formatDate(uploadDate)}
      </Score>
    </Text>
  )
}

const Score = styled.span`
  display: inline-grid;
  grid-template-columns: 18px 1fr;
  gap: 8px;
  align-items: center;
  margin-right: 16px;
  white-space: nowrap;
`

const formatOption: Intl.DateTimeFormatOptions = {
  hour12: false,
  year: 'numeric',
  month: 'narrow',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}
const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  return date.toLocaleString('ja-JP', formatOption)
}
