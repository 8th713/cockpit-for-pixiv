import React from 'react'
import styled from 'styled-components'
import { Text } from '../../shared/Text'
import { BookmarkButton, BookmarkButtonFallback } from './BookmarkButton'
import { DownloadButton, DownloadButtonFallback } from './DownloadButton'
import { ExpansionButton } from './ExpansionButton'
import { FitButton } from './FitButton'
import { HelpButton } from './HelpButton'
import { IllustTitle } from './IllustTitle'
import { LikeButton, LikeButtonFallBack } from './LikeButton'
import { RefreshButton } from './RefreshButton'
import { ShareButton, ShareButtonFallback } from './ShareButton'
import { SpreadButton } from './SpreadButton'

export function Summary() {
  return (
    <Layout>
      <ButtonGroup>
        <ExpansionButton />
      </ButtonGroup>
      <TitleBox>
        <React.Suspense fallback={<Text as="h1" v="h6" />}>
          <IllustTitle />
        </React.Suspense>
      </TitleBox>
      <ButtonGroup>
        <React.Suspense
          fallback={
            <>
              <LikeButtonFallBack />
              <BookmarkButtonFallback />
              <ShareButtonFallback />
              <DownloadButtonFallback />
            </>
          }
        >
          <RefreshButton />
          <LikeButton />
          <BookmarkButton />
          <ShareButton />
          <DownloadButton />
        </React.Suspense>
        <FitButton />
        <SpreadButton />
        <HelpButton />
      </ButtonGroup>
    </Layout>
  )
}

const Layout = styled.div`
  all: unset;
  flex: 0 0 56px;
  display: flex;
  align-items: center;
`
const TitleBox = styled.div`
  overflow: hidden;
  flex: 1;
  margin: 0 16px;
`
const ButtonGroup = styled.div`
  all: unset;
  display: flex;
  padding: 4px;
`
