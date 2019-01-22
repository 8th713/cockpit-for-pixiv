import React from 'react'
import styled from 'styled-components'
import { color, ripple } from '../theme'
import { useUser } from '../../hooks'
import { AccountError, Add } from '../shared/Icon'
import { Button } from '../shared/Button'
import { Hotkeys } from '../Hotkeys'
import { keyMap, getDesc } from '../../constants'

type Props = {
  userId: string
  children?: never
}

const title = [getDesc('follow'), getDesc('privateFollow')].join('\n')

export function Author({ userId }: Props) {
  const { read, follow, retry, isSelf } = useUser(userId)
  function handleFollow(event: { shiftKey: boolean }) {
    follow(event.shiftKey)
  }
  try {
    const user = read()

    return (
      <Layout>
        <Link href={`https://www.pixiv.net/member.php?id=${userId}`}>
          <Avatar src={user.image} />
          {user.name}
        </Link>
        {!isSelf && !user.isFollowed && (
          <Button
            v="contained"
            c="primary"
            title={title}
            onClick={handleFollow}
          >
            <Add width="18" height="18" />
            フォローする
            <Hotkeys {...keyMap.follow} onKeyDown={handleFollow} />
            <Hotkeys {...keyMap.privateFollow} onKeyDown={handleFollow} />
          </Button>
        )}
        {!isSelf && user.isFollowed && (
          <Button v="outlined" c="primary" title={title} onClick={handleFollow}>
            フォロー中
            <Hotkeys {...keyMap.follow} onKeyDown={handleFollow} />
            <Hotkeys {...keyMap.privateFollow} onKeyDown={handleFollow} />
          </Button>
        )}
      </Layout>
    )
  } catch (error) {
    if (error && error.then) {
      throw error
    }
    return (
      <Layout>
        <Link>
          <AccountError width="40" height="40" />
          取得できませんでした
        </Link>
        <Button v="outlined" c="primary" onClick={retry}>
          <Add width="18" height="18" />
          再読込
        </Button>
      </Layout>
    )
  }
}

const Layout = styled.div`
  all: unset;
  position: sticky;
  top: 0;
  display: grid;
  grid-template-rows: 56px 56px;
  align-items: center;
  background-color: ${color.surface};
  color: ${color.surfaceText};
`
const Link = styled.a`
  all: unset;
  cursor: pointer;
  height: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 40px 1fr;
  gap: 16px;
  color: ${color.surfaceText};
  ${ripple};
`
const Avatar = styled.img`
  all: unset;
  user-select: none;
  object-fit: cover;
  width: 40px;
  height: 40px;
  background-color: ${color.surfaceText};
  border-radius: 50%;
`
