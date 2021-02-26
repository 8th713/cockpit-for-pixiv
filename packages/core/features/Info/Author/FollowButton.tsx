import { getHotkeyHint, KEY_ASSIGNMENT } from '../../../keyboardMap'
import { Hotkey } from '../../../shared/Hotkey'
import { FollowIcon, FollowingIcon } from '../../../shared/Icon'
import { IconButton } from '../../../shared/IconButton'
import { AuthorQueryResult, useFollowMutation } from './authorQuery'

export type FollowButtonProps = AuthorQueryResult

const title = [
  getHotkeyHint(KEY_ASSIGNMENT.follow),
  getHotkeyHint(KEY_ASSIGNMENT.followPrivate),
].join('\n')

export const FollowButton = ({ illust, data }: FollowButtonProps) => {
  const { mutate, isLoading: isMutating } = useFollowMutation(illust?.userId!)

  if (!illust || !data)
    return (
      <IconButton type="button" disabled title={title}>
        <FollowIcon />
      </IconButton>
    )

  const { isBookmarkable } = illust

  if (!isBookmarkable)
    return (
      <IconButton type="button" disabled title={title}>
        <FollowIcon />
      </IconButton>
    )

  return (
    <IconButton
      type="button"
      title={title}
      disabled={isMutating}
      onClick={(e) => mutate(e.shiftKey)}
    >
      {data.isFollowed ? (
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
