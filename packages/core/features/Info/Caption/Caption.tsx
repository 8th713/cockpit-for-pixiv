import React from 'react'
import { Box, Flex } from '../../../shared/Box'
import { Title } from '../../../shared/Text'
import { IllustQueryResult } from '../illustQuery'
import { AboutButton } from './AboutButton'
import { BookmarkButton } from './BookmarkButton'
import { CaptionTitle } from './CaptionTitle'
import { DownloadButton } from './DownloadButton'
import { LikeButton } from './LikeButton'
import { RefetchButton } from './RefetchButton'
import { ScrollBottomButton } from './ScrollBottomButton'
import { ShareButton } from './ShareButton'

export type CaptionProps = IllustQueryResult & {
  id: string
}

export const Caption = (props: CaptionProps) => (
  <Flex
    css={{
      alignItems: 'center',
      columnGap: '$3',
      backgroundColor: '$surface',
      color: '$onSurface',
    }}
  >
    <Box css={{ padding: '$1' }}>
      <ScrollBottomButton />
    </Box>
    <Title css={{ flexGrow: 1, paddingY: '$1', ellipsis: 'auto' }}>
      <CaptionTitle {...props} />
    </Title>
    <Box css={{ padding: '$1' }}>
      <RefetchButton {...props} />
      <LikeButton {...props} />
      <BookmarkButton {...props} />
      <DownloadButton {...props} />
      <ShareButton {...props} />
      <AboutButton />
    </Box>
  </Flex>
)
