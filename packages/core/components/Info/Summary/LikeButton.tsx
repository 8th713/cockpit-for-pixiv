import React from 'react'
import styled from 'styled-components'
import { color } from '../../theme'
import { AsyncStatus } from '../../../interfaces'
import { IllustProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Like } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants/keyMap'

const title = getDesc('like')

export function LikeButton() {
  const result = IllustProvider.useValue()
  const { like } = IllustProvider.useAction()

  if (result.status !== AsyncStatus.Success) {
    return (
      <Button v="icon" disabled title={title}>
        <Like />
      </Button>
    )
  }
  const { value } = result

  if (value.isBookmarkable === false) {
    return (
      <Button v="icon" disabled title="いいね！(L)">
        <Like />
      </Button>
    )
  }
  if (value.likeData) {
    return (
      <FakeButton>
        <Like />
      </FakeButton>
    )
  }
  return (
    <Button v="icon" onClick={like} title="いいね！(L)">
      <Like />
      <Hotkeys {...keyMap.like} onKeyDown={like} />
    </Button>
  )
}

const FakeButton = styled.div`
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  margin: auto;
  padding: 12px;
  color: ${color.primary};
`
