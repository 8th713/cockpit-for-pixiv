import css from '@styled-system/css'
import React from 'react'
import styled from 'styled-components'
import {
  ArtworksIcon,
  Avatar,
  Box,
  createTransition,
  Flex,
  FollowedIcon,
  FollowIcon,
  HomeIcon,
  IconButton,
  Link,
  ProfileIcon,
  RefreshIcon,
  Text,
  themeGet,
  TwitterIcon,
  getHotkeyHint,
  Hotkey
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { fetchUser, followUser, isSelf } from '../../externals/apiClient'
import { createCache } from '../../hooks/useCache'
import { useIllust } from '../Illust'
import { useRouteId } from '../Router'
import { Profile } from './Profile'

interface Props {
  userId: string
}

interface FollowButtonProps {
  disabled: boolean
  followed: boolean
  onClick: (event: { shiftKey: boolean }) => void
}

const title = [
  getHotkeyHint(KEY_ASSIGNMENT.follow),
  getHotkeyHint(KEY_ASSIGNMENT.followPrivate)
].join('\n')

export const useUser = createCache(fetchUser, 20)

export const User = () => (
  <React.Suspense fallback={null}>
    <IllustLoader />
  </React.Suspense>
)

const IllustLoader = () => {
  const id = useRouteId()
  const illust = useIllust(id)
  if (!illust) return null
  return <Loader userId={illust.userId} />
}

const Loader = ({ userId }: Props) => {
  const user = useUser(userId)
  if (!user) return <Failure userId={userId} />
  return <Success {...user} />
}

const Failure = ({ userId }: Props) => (
  <Box sx={{ bg: 'surface', color: 'onSurface' }}>
    <NameLink href={`https://www.pixiv.net/member.php?id=${userId}`}>
      <Avatar />
      <Text variant="h2" sx={{ ml: 3 }}>
        取得できませんでした
      </Text>
    </NameLink>
    <Flex sx={{ m: 2 }}>
      <IconButton title="再取得" onClick={() => useUser.remove(userId)}>
        <RefreshIcon />
      </IconButton>
      <IconButton title="プロフィール" disabled>
        <ProfileIcon />
      </IconButton>
      <IconButton.Link
        href={`/member_illust.php?id=${userId}`}
        title="作品一覧"
      >
        <ArtworksIcon />
      </IconButton.Link>
    </Flex>
  </Box>
)

const Success = (props: Pixiv.User) => {
  const { userId, image, name, isFollowed, webpage, social } = props
  const self = isSelf(userId)
  const handleFollow = (event: { shiftKey: boolean }) => {
    if (self) return

    useUser.replace(userId, { ...props, isFollowed: true })
    followUser(userId, event.shiftKey).finally(() => useUser.refresh(userId))
  }

  return (
    <Box sx={{ bg: 'surface', color: 'onSurface' }}>
      <NameLink href={`https://www.pixiv.net/member.php?id=${userId}`}>
        <Avatar src={image} />
        <Text variant="h2" sx={{ ml: 3 }}>
          {name}
        </Text>
      </NameLink>
      <Flex sx={{ m: 2 }}>
        <FollowButton
          disabled={self}
          followed={isFollowed}
          onClick={handleFollow}
        />
        <Profile key={props.userId} {...props} />
        <IconButton.Link
          href={`/member_illust.php?id=${userId}`}
          title="作品一覧"
        >
          <ArtworksIcon />
        </IconButton.Link>
        {webpage && (
          <IconButton.Link
            href={webpage}
            target="_blank"
            rel="noopener referer"
            title="Web ページ"
          >
            <HomeIcon />
          </IconButton.Link>
        )}
        {social.twitter && (
          <IconButton.Link
            href={social.twitter.url}
            target="_blank"
            rel="noopener referer"
            title="Twitter"
          >
            <TwitterIcon />
          </IconButton.Link>
        )}
      </Flex>
    </Box>
  )
}

const NameLink = styled(Link)(
  css({
    outlineWidth: 0,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    px: 3,
    py: 2,
    borderRadius: 4,
    color: 'onSurface',
    textDecoration: 'none',
    '::after': {
      content: '""',
      pointerEvents: 'none',
      boxSizing: 'inherit',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: 'inherit',
      bg: 'currentColor',
      opacity: 0,
      transition: createTransition('opacity')
    },
    '&:hover::after': {
      opacity: themeGet('opacities.hover')
    },
    '&:focus::after': {
      opacity: themeGet('opacities.focus')
    }
  })
)

const FollowButton = ({ disabled, followed, onClick }: FollowButtonProps) => {
  const icon = followed ? (
    <FollowedIcon sx={{ color: 'primary' }} />
  ) : (
    <FollowIcon />
  )

  return (
    <IconButton disabled={disabled} title={title} onClick={onClick}>
      {icon}
      {!disabled && (
        <>
          <Hotkey {...KEY_ASSIGNMENT.follow} action={onClick} />
          <Hotkey {...KEY_ASSIGNMENT.followPrivate} action={onClick} />
        </>
      )}
    </IconButton>
  )
}

if (__DEV__) {
  IllustLoader.displayName = 'User.IllustLoader'
  Loader.displayName = 'User.Loader'
  Failure.displayName = 'User.Failure'
  Success.displayName = 'User.Success'
  NameLink.displayName = 'User.NameLink'
  FollowButton.displayName = 'Caption.FollowButton'
}
