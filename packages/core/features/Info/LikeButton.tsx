import { KEY_ASSIGNMENT, toButtonTitle } from '../../keyboardMap'
import { Hotkey } from '../../shared/Hotkey'
import { IconButton } from '../../shared/IconButton'
import { LikeIcon } from '../../shared/Icons'
import { useLikeMutation } from './infoQuery'

export interface LikeButtonProps {
  info?: Pixiv.IllustInfo
}

const title = toButtonTitle(KEY_ASSIGNMENT.like)

export function LikeButton({ info }: LikeButtonProps) {
  const { mutate, isLoading: isMutating } = useLikeMutation(info?.illustId!)

  if (!info || !info.isBookmarkable)
    return (
      <IconButton type="button" disabled title={title}>
        <LikeIcon />
      </IconButton>
    )

  const { likeData: isLiked } = info

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
      loading={isMutating}
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
