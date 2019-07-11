import React from 'react'
import styled from 'styled-components'
import { ToggleForm } from '../../Bookmark'
import { Box } from '../../shared/Box'
import { Text } from '../../shared/Text'
import { BookmarkButton, BookmarkButtonMock } from './BookmarkButton'
import { DownloadButton, DownloadButtonMock } from './DownloadButton'
import { FullSizeModeButton } from './FullSizeModeButton'
import { HelpButton } from './HelpButton'
import { LikeButton, LikeButtonMock } from './LikeButton'
import { ReloadButton } from './ReloadButton'
import { ScrollButton } from './ScrollButton'
import { ShareButton, ShareButtonMock } from './ShareButton'
import { Title } from './Title'

export function Caption() {
  return (
    <Root>
      <Box display="flex" p={1}>
        <ScrollButton />
      </Box>
      <Text textStyle="h1" ellipsis px={3}>
        <React.Suspense fallback={null}>
          <Title />
        </React.Suspense>
      </Text>
      <Box flexGrow={1} />
      <Box display="flex" p={1}>
        <React.Suspense
          fallback={
            <>
              <LikeButtonMock />
              <BookmarkButtonMock />
              <DownloadButtonMock />
              <ShareButtonMock />
            </>
          }
        >
          <ReloadButton />
          <LikeButton />
          <ToggleForm>
            <BookmarkButton />
          </ToggleForm>
          <DownloadButton />
          <ShareButton />
        </React.Suspense>
        <FullSizeModeButton />
        <HelpButton />
      </Box>
    </Root>
  )
}

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
