import React from 'react'
import styled from 'styled-components'
import { Box, Text } from '../../components'
import { HelpButton } from '../About'
import { Bookmark, BookmarkButtonMock } from '../Bookmark'
import { ScrollButton } from '../ScrollSpy'
import { DownloadButton, DownloadButtonMock } from './DownloadButton'
import { LikeButton, LikeButtonMock } from './LikeButton'
import { ReloadButton } from './ReloadButton'
import { ShareButton, ShareButtonMock } from './ShareButton'
import { Title } from './Title'

export const Caption = () => (
  <Root>
    <Box display="flex" p={1}>
      <ScrollButton />
    </Box>
    <React.Suspense fallback={<CaptionLoading />}>
      <CaptionSuccess />
    </React.Suspense>
  </Root>
)
const CaptionLoading = () => (
  <>
    <Text textStyle="h1" textOverflow="ellipsis" px={3} />
    <Box flexGrow={1} />
    <Box display="flex" p={1}>
      <LikeButtonMock />
      <BookmarkButtonMock />
      <DownloadButtonMock />
      <ShareButtonMock />
      <HelpButton />
    </Box>
  </>
)
const CaptionSuccess = () => (
  <>
    <Text textStyle="h1" textOverflow="ellipsis" px={3}>
      <Title />
    </Text>
    <Box flexGrow={1} />
    <Box display="flex" p={1}>
      <ReloadButton />
      <LikeButton />
      <Bookmark />
      <DownloadButton />
      <ShareButton />
      <HelpButton />
    </Box>
  </>
)

const Root = styled.div`
  box-sizing: border-box;
  position: sticky;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  height: var(--caption-height);
  background-color: var(--surface);
  align-items: center;
`
