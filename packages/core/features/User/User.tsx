import React from 'react'
import styled from 'styled-components'
import {
  AccountErrorIcon,
  AddIcon,
  Box,
  Button,
  getHotkeyHint,
  Hotkey,
  Link,
  RefreshIcon
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
interface FailureProps extends Props {}
interface SuccessProps extends Pixiv.User {}

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
  return <UserLoader userId={illust.userId} />
}
const UserLoader = ({ userId }: Props) => {
  const user = useUser(userId)
  if (!user) return <UserFailure userId={userId} />
  return <UserSuccess {...user} />
}
const UserFailure = ({ userId }: FailureProps) => {
  return (
    <Box>
      <NameLine>
        <AccountErrorIcon width="40" height="40" />
        <Box ml={3}>取得できませんでした</Box>
      </NameLine>
      <Action>
        <Button
          variant="contained"
          colors="error"
          onClick={() => useUser.remove(userId)}
        >
          <RefreshIcon size={18} mr={2} />
          再取得
        </Button>
      </Action>
      <Link textStyle="b2" ml={3} href={`/member_illust.php?id=${userId}`}>
        作品一覧を見る
      </Link>
    </Box>
  )
}
const UserSuccess = (props: SuccessProps) => {
  const { userId, image, name, isFollowed } = props
  const self = isSelf(userId)
  const handleFollow = (event: { shiftKey: boolean }) => {
    if (self) return

    useUser.replace(userId, { ...props, isFollowed: true })
    followUser(userId, event.shiftKey).finally(() => useUser.refresh(userId))
  }
  return (
    <Box>
      <NameLine href={`https://www.pixiv.net/member.php?id=${userId}`}>
        <Avatar src={image} loading="lazy" width="40" height="40" />
        <Box ml={3}>{name}</Box>
      </NameLine>
      {!self && (
        <Action>
          <Button
            variant={isFollowed ? 'outlined' : 'contained'}
            colors="primary"
            title={title}
            onClick={handleFollow}
          >
            {isFollowed ? null : <AddIcon />}
            {isFollowed ? 'フォロー中' : 'フォローする'}
          </Button>
          <Hotkey {...KEY_ASSIGNMENT.follow} action={handleFollow} />
          <Hotkey {...KEY_ASSIGNMENT.followPrivate} action={handleFollow} />
        </Action>
      )}
      <Link textStyle="b2" ml={3} href={`/member_illust.php?id=${userId}`}>
        作品一覧を見る
      </Link>
      <Profile key={props.userId} {...props} />
    </Box>
  )
}

const NameLine = styled.a`
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  display: flex;
  overflow: hidden;
  padding: 8px 16px;
  border-radius: 8px;
  color: var(--on-surface);
  text-decoration: none;
  align-items: center;
  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    opacity: 0;
    transition: opacity 15ms linear;
  }
  &:hover {
    text-decoration: none;
    &::before {
      opacity: var(--hovered);
    }
  }
  &:focus {
    outline: auto var(--primary);
    &::before {
      opacity: var(--focused);
    }
  }
  &:active {
    &::before {
      opacity: var(--pressed);
    }
  }
`
const Avatar = styled.img`
  all: unset;
  user-select: none;
  object-fit: cover;
  width: 40px;
  height: 40px;
  background-color: var(--surface);
  border-radius: 50%;
`
const Action = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0 8px 16px;
`
