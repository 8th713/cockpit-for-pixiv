import css from '@styled-system/css'
import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, IconButton, Link, RefreshIcon } from '../../components'
import { HelpButton } from '../About'
import { Bookmark } from '../Bookmark'
import { useIllust } from '../Illust'
import { useRouteId } from '../Router'
import { ScrollButton } from '../ScrollSpy'
import { DownloadButton } from './DownloadButton'
import { LikeButton } from './LikeButton'
import { ShareButton } from './ShareButton'

interface Props {
  illustId: string
}

export const Caption = () => (
  <React.Suspense fallback={<Loading />}>
    <Loader />
  </React.Suspense>
)

const Loader = () => {
  const id = useRouteId()
  const illust = useIllust(id)
  if (!illust) return <Failure illustId={id} />
  return <Success {...illust} />
}

const Loading = () => (
  <Root>
    <ActionBox>
      <ScrollButton />
    </ActionBox>
    <Heading sx={{ mx: 3, flexGrow: 1 }} textOverflow="ellipsis" />
    <ActionBox>
      <LikeButton.Mock />
      <Bookmark.Mock />
      <DownloadButton.Mock />
      <ShareButton.Mock />
      <HelpButton />
    </ActionBox>
  </Root>
)

const Success = (props: Pixiv.Illust) => (
  <Root>
    <ActionBox>
      <ScrollButton />
    </ActionBox>
    <Heading sx={{ mx: 3, flexGrow: 1 }} textOverflow="ellipsis">
      <TitleLink href={`/artworks/${props.id}`}>{props.title}</TitleLink>
    </Heading>
    <ActionBox>
      <LikeButton {...props} />
      <Bookmark key={props.id} {...props} />
      <DownloadButton {...props} />
      <ShareButton {...props} />
      <HelpButton />
    </ActionBox>
  </Root>
)

const Failure = ({ illustId }: Props) => (
  <Root>
    <ActionBox>
      <ScrollButton />
    </ActionBox>
    <Heading sx={{ mx: 3, flexGrow: 1 }} textOverflow="ellipsis">
      <TitleLink href={`/artworks/${illustId}`}>取得できませんでした</TitleLink>
    </Heading>
    <ActionBox>
      <IconButton
        title="再取得"
        sx={{ color: 'primary' }}
        onClick={() => useIllust.remove(illustId)}
      >
        <RefreshIcon />
      </IconButton>
      <LikeButton.Mock />
      <Bookmark.Mock />
      <DownloadButton.Mock />
      <ShareButton.Mock />
      <HelpButton />
    </ActionBox>
  </Root>
)

const Root = styled(Flex)(
  css({
    alignItems: 'center',
    width: '100%',
    bg: 'surface',
    color: 'onSurface'
  })
)

const ActionBox = styled(Flex)(
  css({
    p: 1,
    flexShrink: 0
  })
)

const TitleLink = styled(Link)(
  css({
    color: 'inherit',
    textDecorationLine: 'none'
  })
)

if (__DEV__) {
  Loader.displayName = 'Caption.Loader'
  Loading.displayName = 'Caption.Loading'
  Success.displayName = 'Caption.Success'
  Failure.displayName = 'Caption.Failure'
  Root.displayName = 'Caption.Root'
  ActionBox.displayName = 'Caption.ActionBox'
  TitleLink.displayName = 'Caption.TitleLink'
}
