import React from 'react'
import { getHotkeyHint, KEY_ASSIGNMENT } from '../../../keyboardMap'
import { Hotkey } from '../../../shared/Hotkey'
import { LikeIcon } from '../../../shared/Icon'
import { IconButton } from '../../../shared/IconButton'
import { IllustQueryResult, useLikeMutation } from '../illustQuery'

export type LikeButtonProps = IllustQueryResult & {
  id: string
}

const title = getHotkeyHint(KEY_ASSIGNMENT.like)

export const LikeButton = ({ id, data }: LikeButtonProps) => {
  const { mutate, isLoading: isMutating } = useLikeMutation(id)

  if (!data || !data.isBookmarkable)
    return (
      <IconButton type="button" disabled title={title}>
        <LikeIcon />
      </IconButton>
    )

  const { likeData: isLiked } = data

  if (isLiked)
    return (
      <IconButton
        type="button"
        disabled
        title={title}
        css={{ '&:disabled': { opacity: 1 } }}
      >
        <LikeIcon css={{ color: '$primary' }} />
      </IconButton>
    )

  const likeIt = () => mutate()

  return (
    <IconButton
      type="button"
      disabled={isMutating}
      title={title}
      onClick={likeIt}
    >
      <LikeIcon />
      <Hotkey
        {...KEY_ASSIGNMENT.like}
        disabled={isMutating}
        onKeydown={likeIt}
      />
    </IconButton>
  )
}
