import React from 'react'
import styled from 'styled-components'
import { KEY_ASSIGNMENT } from '../../../constants'
import { useServices } from '../../Services'
import { Button } from '../../shared/Button'
import { Hotkey } from '../../shared/Hotkey'
import { Add } from '../../shared/Icon'
import { getTitle } from '../utils'
import { useUser } from './UserHost'

const title = [
  getTitle(KEY_ASSIGNMENT.follow),
  getTitle(KEY_ASSIGNMENT.followPrivate)
].join('\n')

export function FollowButton() {
  const { apiClient } = useServices()
  const { read, reload, replace } = useUser()
  const user = read()

  if (!user) {
    return (
      <Action>
        <Button kind="outlined" color="primary" onClick={() => reload()}>
          <Add width="18" height="18" />
          再読込
        </Button>
      </Action>
    )
  }
  const { isFollowed, userId } = user
  const isSelf = apiClient.isSelf(userId)

  if (isSelf) return null

  const handleFollow = (event: { shiftKey: boolean }) => {
    if (isSelf) return
    replace({ ...user, isFollowed: true })
    apiClient
      .followUser(userId, event.shiftKey)
      .then(() => reload(), () => replace(user))
  }

  return (
    <Action>
      {!isFollowed && (
        <Button
          kind="contained"
          color="primary"
          title={title}
          onClick={handleFollow}
        >
          <Add style={{ marginRight: 8 }} />
          フォローする
          <Hotkey {...KEY_ASSIGNMENT.follow} action={handleFollow} />
          <Hotkey {...KEY_ASSIGNMENT.followPrivate} action={handleFollow} />
        </Button>
      )}
      {isFollowed && (
        <Button
          kind="outlined"
          color="primary"
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
