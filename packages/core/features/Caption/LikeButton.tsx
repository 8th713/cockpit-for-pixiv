import React from 'react'
import {
  getHotkeyHint,
  Hotkey,
  IconButton,
  LikeIcon,
  SxProps
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { like, likeBy, useIllust } from '../Illust'

const title = getHotkeyHint(KEY_ASSIGNMENT.like)

export const LikeButton = (props: Pixiv.Illust) => {
  if (!props.isBookmarkable) return <LikeButton.Mock />
  if (props.likeData)
    return (
      <LikeButton.Mock
        sx={{
          ':disabled': {
            color: 'primary',
            opacity: 1
          }
        }}
      />
    )

  const handleLike = () => {
    if (!props.isBookmarkable) return
    if (props.likeData) return

    useIllust.replace(props.id, like(props))
    likeBy(props.id).finally(() => useIllust.refresh(props.id))
  }

  return (
    <IconButton onClick={handleLike} title={title}>
      <LikeIcon />
      <Hotkey {...KEY_ASSIGNMENT.like} action={handleLike} />
    </IconButton>
  )
}

const Mock = ({ sx }: SxProps) => (
  <IconButton disabled title={title} sx={sx}>
    <LikeIcon />
  </IconButton>
)
LikeButton.Mock = Mock

if (__DEV__) {
  Mock.displayName = 'LikeButton.Mock'
}
