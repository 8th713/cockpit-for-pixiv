import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { Box } from '../../shared/Box'
import { Hotkey } from '../../shared/Hotkey'
import { Like } from '../../shared/Icon'
import { IconButton } from '../../shared/IconButton'
import { getTitle, like } from '../utils'

const title = getTitle(KEY_ASSIGNMENT.like)

export function LikeButton() {
  const { useIllust, likeBy } = useServices()
  const id = useRoute()[0]!
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