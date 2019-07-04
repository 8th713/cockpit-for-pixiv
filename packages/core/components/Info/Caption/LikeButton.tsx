import React from 'react'
import styled from 'styled-components'
import { KEY_ASSIGNMENT } from '../../../constants'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { Hotkey } from '../../shared/Hotkey'
import { Like } from '../../shared/Icon'
import { IconButton } from '../../shared/IconButton'
import { getTitle, like } from '../utils'

const title = getTitle(KEY_ASSIGNMENT.like)

export function LikeButton() {
  const { apiClient } = useServices()
  const { read, reload, replace } = apiClient.useIllust()
  const id = useRoute()[0]!
  const illust = read(id)

  if (!illust) return <LikeButtonMock />
  if (!illust.isBookmarkable)
    return (
      <IconButton disabled title={title}>
        <Like />
      </IconButton>
    )
  if (illust.likeData)
    return (
      <FakeButton>
        <Like />
      </FakeButton>
    )

  const handleLike = () => {
    if (!illust.isBookmarkable) return
    if (illust.likeData) return

    replace(id, like(illust))
    apiClient.likeBy(id).then(() => reload(id), () => replace(id, illust))
  }

  return (
    <IconButton onClick={handleLike} title={title}>
      <Like />
      <Hotkey {...KEY_ASSIGNMENT.like} action={handleLike} />
    </IconButton>
  )
}

export function LikeButtonMock() {
  return (
    <IconButton disabled title={title}>
      <Like />
    </IconButton>
  )
}

const FakeButton = styled.div`
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  margin: auto;
  padding: 12px;
  color: var(--primary);
`
