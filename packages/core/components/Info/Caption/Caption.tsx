import React from 'react'
import styled from 'styled-components'
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
    <Snackbar>
      <ButtonGroup>
        <ScrollButton />
      </ButtonGroup>
      <Header>
        <React.Suspense fallback={null}>
          <Title />
        </React.Suspense>
      </Header>
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
          <BookmarkButton />
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
const Header = styled.h1`
  overflow: hidden;
  margin: 0 0 0 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const Grow = styled.div`
  flex-grow: 1;
`
