import React from 'react'
import styled from 'styled-components'
import { KEY_ASSIGNMENT } from '../../../constants'
import { useServices } from '../../Services'
import { Button } from '../../shared/Button'
import { Hotkey } from '../../shared/Hotkey'
import { Add } from '../../shared/Icon'
import { getTitle } from '../utils'

type Props = {
  id: string
}

const title = [
  getTitle(KEY_ASSIGNMENT.follow),
  getTitle(KEY_ASSIGNMENT.followPrivate)
].join('\n')

export function FollowButton({ id }: Props) {
  const { apiClient } = useServices()
  const { read, reload, remove, replace } = apiClient.useUser()
  const user = read(id)

  if (!user) {
    return (
      <Action>
        <Button kind="outlined" color="primary" onClick={() => remove(id)}>
          <Add width="18" height="18" />
          再読込
        </Button>
      </Action>
    )
  }
  const { isFollowed } = user
  const isSelf = apiClient.isSelf(id)

  if (isSelf) return null

  const handleFollow = (event: { shiftKey: boolean }) => {
    if (isSelf) return
    replace(id, { ...user, isFollowed: true })
    apiClient
      .followUser(id, event.shiftKey)
      .then(() => reload(id), () => replace(id, user))
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
