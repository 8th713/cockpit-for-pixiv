import React from 'react'
import styled from 'styled-components'
import { ExpansionButton } from './ExpansionButton'
import { IllustTitle } from './IllustTitle'
import { RefreshButton } from './RefreshButton'
import { LikeButton } from './LikeButton'
import { BookmarkButton } from './BookmarkButton'
import { ShareButton } from './ShareButton'
import { DownloadButton } from './DownloadButton'
import { FitButton } from './FitButton'
import { SpreadButton } from './SpreadButton'
import { HelpButton } from './HelpButton'

export const Summary: React.FC = () => {
  return (
    <Layout>
      <ButtonGroup>
        <ExpansionButton />
      </ButtonGroup>
      <TitleBox>
        <IllustTitle />
      </TitleBox>
      <ButtonGroup>
        <RefreshButton />
        <LikeButton />
        <BookmarkButton />
        <ShareButton />
        <DownloadButton />
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
