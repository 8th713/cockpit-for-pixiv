import React from 'react'
import styled from 'styled-components'
import { KEY_ASSIGNMENT } from '../../../constants'
import { useServices } from '../../Services'
import { Add, Button, getHotkeyHint, Hotkey, Refresh } from '../../shared'

type Props = {
  id: string
}

const title = [
  getHotkeyHint(KEY_ASSIGNMENT.follow),
  getHotkeyHint(KEY_ASSIGNMENT.followPrivate)
].join('\n')

export function FollowButton({ id }: Props) {
  const { useUser, followUser, isSelf } = useServices()
  const user = useUser(id)

  if (!user)
    return (
      <Action>
        <Button
          variant="contained"
          colors="error"
          onClick={() => useUser.remove(id)}
        >
          <Refresh size={18} mr={2} />
          再取得
        </Button>
      </Action>
    )

  const { isFollowed } = user
  const self = isSelf(id)

  if (self) return null

  const handleFollow = (event: { shiftKey: boolean }) => {
    if (self) return

    useUser.replace(id, { ...user, isFollowed: true })
    followUser(id, event.shiftKey).finally(() => useUser.refresh(id))
  }

  return (
    <Action>
      {!isFollowed && (
        <Button
          variant="contained"
          colors="primary"
          title={title}
          onClick={handleFollow}
        >
          <Add size={18} mr={2} />
          フォローする
          <Hotkey {...KEY_ASSIGNMENT.follow} action={handleFollow} />
          <Hotkey {...KEY_ASSIGNMENT.followPrivate} action={handleFollow} />
        </Button>
      )}
      {isFollowed && (
        <Button
          variant="outlined"
          colors="primary"
          title={title}
          onClick={handleFollow}
        >
          フォロー中
          <Hotkey {...KEY_ASSIGNMENT.follow} action={handleFollow} />
          <Hotkey {...KEY_ASSIGNMENT.followPrivate} action={handleFollow} />
        </Button>
      )}
    </Action>
  )
}

const Action = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0 8px 16px;
`
