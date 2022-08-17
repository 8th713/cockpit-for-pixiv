import { toButtonTitle, KEY_ASSIGNMENT } from '../../keyboardMap'
import { Hotkey } from '../../shared/Hotkey'
import { FollowIcon, FollowingIcon } from '../../shared/Icons'
import { IconButton } from '../../shared/IconButton'
import { useFollowMutation } from './authorQuery'

export interface FollowButtonProps {
  info?: Pixiv.IllustInfo
  author?: Pixiv.User
}

const title = [
  toButtonTitle(KEY_ASSIGNMENT.follow),
  toButtonTitle(KEY_ASSIGNMENT.followPrivate),
].join('\n')

export function FollowButton({ info, author }: FollowButtonProps) {
  const { mutate, isLoading: isMutating } = useFollowMutation(author?.userId!)

  if (!info || !author || info.userId !== author.userId || !info.isBookmarkable)
    return (
      <IconButton type="button" disabled title={title}>
        <FollowIcon />
      </IconButton>
    )

  return (
    <IconButton
      type="button"
      title={title}
      loading={isMutating}
      onClick={(e) => mutate(e.shiftKey)}
    >
      {author.isFollowed ? (
        <FollowingIcon css={{ color: '$primary' }} />
      ) : (
        <FollowIcon />
      )}
      <Hotkey
        {...KEY_ASSIGNMENT.follow}
        disabled={isMutating}
        onKeydown={() => mutate(false)}
      />
      <Hotkey
        {...KEY_ASSIGNMENT.followPrivate}
        disabled={isMutating}
        onKeydown={() => mutate(true)}
      />
    </IconButton>
  )
}
