import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { useRouteId } from '../../Router'
import { useServices } from '../../Services'
import { Box, Hotkey, IconButton, Like } from '../../shared'
import { getTitle, like } from '../utils'

const title = getTitle(KEY_ASSIGNMENT.like)

export function LikeButton() {
  const { useIllust, likeBy } = useServices()
  const id = useRouteId()
  const illust = useIllust(id)

  if (!illust) return <LikeButtonMock />

  const { isBookmarkable, likeData } = illust

  if (!isBookmarkable)
    return (
      <IconButton disabled title={title}>
        <Like />
      </IconButton>
    )
  if (likeData)
    return (
      <Box size={48} p="12px" color="primary">
        <Like />
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
