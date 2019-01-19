import React from 'react'
import { AsyncStatus } from '../../interfaces'
import { UserProvider } from '../../contexts'
import { Button } from '../shared/Button'
import { Add } from '../shared/Icon'
import { Hotkeys } from '../Hotkeys'
import { keyMap, getDesc } from '../../constants/keyMap'

const title = [getDesc('follow'), getDesc('privateFollow')].join('\n')

export function FollowButton() {
  const result = UserProvider.useValue()
  const { retry, follow, isSelf } = UserProvider.useAction()
  const handleFollow = React.useCallback(
    (event: { shiftKey: boolean }) => {
      follow(event.shiftKey)
    },
    [follow]
  )

  switch (result.status) {
    case AsyncStatus.Loading:
      return null
    case AsyncStatus.Failure: {
      return (
        <Button v="outlined" c="primary" onClick={retry}>
          <Add width="18" height="18" />
          再読込
        </Button>
      )
    }
    case AsyncStatus.Success: {
      const { value } = result

      if (isSelf(value.userId)) return null
      if (value.isFollowed) {
        return (
          <Button v="outlined" c="primary" title={title} onClick={handleFollow}>
            フォロー中
            <Hotkeys {...keyMap.follow} onKeyDown={handleFollow} />
            <Hotkeys {...keyMap.privateFollow} onKeyDown={handleFollow} />
          </Button>
        )
      }
      return (
        <Button v="contained" c="primary" title={title} onClick={handleFollow}>
          <Add width="18" height="18" />
          フォローする
          <Hotkeys {...keyMap.follow} onKeyDown={handleFollow} />
          <Hotkeys {...keyMap.privateFollow} onKeyDown={handleFollow} />
        </Button>
      )
    }
  }
}
