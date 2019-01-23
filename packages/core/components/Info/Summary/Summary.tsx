import React from 'react'
import styled from 'styled-components'
import { ExpansionButton } from './ExpansionButton'
import { IllustTitle } from './IllustTitle'
import { RefreshButton } from './RefreshButton'
import { LikeButton, LikeButtonFallBack } from './LikeButton'
import { BookmarkButton, BookmarkButtonFallback } from './BookmarkButton'
import { ShareButton, ShareButtonFallback } from './ShareButton'
import { DownloadButton, DownloadButtonFallback } from './DownloadButton'
import { FitButton } from './FitButton'
import { SpreadButton } from './SpreadButton'
import { HelpButton } from './HelpButton'
import { Text } from '../../shared/Text'

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
  flex: 1;
  margin: 0 16px;
`
const ButtonGroup = styled.div`
  all: unset;
  display: flex;
  padding: 4px;
`
