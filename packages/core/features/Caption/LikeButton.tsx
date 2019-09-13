import React from 'react'
import {
  Box,
  getHotkeyHint,
  Hotkey,
  IconButton,
  LikeIcon
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { like, likeBy, useIllust } from '../Illust'
import { useRouteId } from '../Router'

const title = getHotkeyHint(KEY_ASSIGNMENT.like)

export const LikeButton = () => {
  const id = useRouteId()
  const illust = useIllust(id)

  if (!illust) return <LikeButtonMock />

  const { isBookmarkable, likeData } = illust

  if (!isBookmarkable)
    return (
      <IconButton disabled title={title}>
        <LikeIcon />
      </IconButton>
    )
  if (likeData)
    return (
      <Box size={48} p="12px" color="primary">
        <LikeIcon />
      </Box>
    )

  const handleLike = () => {
    if (!isBookmarkable) return
    if (likeData) return

    useIllust.replace(id, like(illust))
    likeBy(id).finally(() => useIllust.refresh(id))
  }

  return (
    <IconButton onClick={handleLike} title={title}>
      <LikeIcon />
      <Hotkey {...KEY_ASSIGNMENT.like} action={handleLike} />
    </IconButton>
  )
}

export const LikeButtonMock = () => {
  return (
    <IconButton disabled title={title}>
      <LikeIcon />
    </IconButton>
  )
}
