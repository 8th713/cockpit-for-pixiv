import React from 'react'
import styled from 'styled-components'
import { ToggleForm } from '../../Bookmark'
import { BookmarkButton, BookmarkButtonMock } from './BookmarkButton'
import { DownloadButton, DownloadButtonMock } from './DownloadButton'
import { FullSizeModeButton } from './FullSizeModeButton'
import { HelpButton } from './HelpButton'
import { LikeButton, LikeButtonMock } from './LikeButton'
import { ReloadButton } from './ReloadButton'
import { ScrollButton } from './ScrollButton'
import { ShareButton, ShareButtonMock } from './ShareButton'
import { Title } from './Title'
import { Text } from '../../shared/Text'

export function Caption() {
  return (
    <Snackbar>
      <ButtonGroup>
        <ScrollButton />
      </ButtonGroup>
      <Text kind="h1" noWrap style={{ paddingLeft: 16, paddingRight: 16 }}>
        <React.Suspense fallback={null}>
          <Title />
        </React.Suspense>
      </Text>
      <Grow />
      <ButtonGroup>
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
      </ButtonGroup>
    </Snackbar>
  )
}

const Snackbar = styled.div`
  box-sizing: border-box;
  position: sticky;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  height: var(--caption-height);
  background-color: var(--surface);
`
const ButtonGroup = styled.div`
  display: flex;
  padding: 4px;
`
const Grow = styled.div`
  flex-grow: 1;
`
