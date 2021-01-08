import React from 'react'
import { Avatar } from '../../../shared/Avatar'
import { Flex, Skeleton } from '../../../shared/Box'
import {
  ArtworksIcon,
  HomeIcon,
  RefreshIcon,
  TwitterIcon,
} from '../../../shared/Icon'
import { IconButton, IconLink } from '../../../shared/IconButton'
import { useAuthorQuery } from './authorQuery'
import { FollowButton } from './FollowButton'
import { NameLink } from './NameLink'
import { ProfileButton } from './ProfileButton'

export type AuthorProps = {
  illustId: string
}

export const Author = ({ illustId }: AuthorProps) => {
  const props = useAuthorQuery(illustId)
  const { illust, data: author, isError, refetch } = props

  return (
    <Flex
      css={{
        flexDirection: 'column',
        rowGap: '$2',
        backgroundColor: '$surface',
        color: '$onSurface',
      }}
    >
      <NameLink href={author && `/member.php?id=${author.userId}`}>
        {author ? (
          <Avatar src={author.image} />
        ) : (
          <Skeleton css={{ size: 48, borderRadius: '50%' }} />
        )}
        {illust ? illust.userName : <Skeleton css={{ w: 128, h: 16 }} />}
      </NameLink>
      <Flex>
        {isError && (
          <IconButton type="button" onClick={() => refetch()}>
            <RefreshIcon />
          </IconButton>
        )}
        <FollowButton {...props} />
        <ProfileButton key={illustId} {...props} />
        {illust ? (
          <IconLink
            href={`/member_illust.php?id=${illust.userId}`}
            title="作品一覧"
          >
            <ArtworksIcon />
          </IconLink>
        ) : (
          <IconButton type="button" disabled title="作品一覧">
            <ArtworksIcon />
          </IconButton>
        )}
        {author && author.webpage ? (
          <IconLink
            target="_blank"
            rel="noopener referer"
            href={author.webpage}
            title="Web ページ"
          >
            <HomeIcon />
          </IconLink>
        ) : null}
        {author && author.social && author.social.twitter ? (
          <IconLink
            target="_blank"
            rel="noopener referer"
            href={author.social.twitter.url}
            title="Twitter アカウント"
          >
            <TwitterIcon />
          </IconLink>
        ) : null}
      </Flex>
    </Flex>
  )
}
