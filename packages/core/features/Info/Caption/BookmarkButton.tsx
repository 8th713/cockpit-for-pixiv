import { getHotkeyHint, KEY_ASSIGNMENT } from '../../../keyboardMap'
import { Hotkey } from '../../../shared/Hotkey'
import { BookmarkOffIcon, BookmarkOnIcon } from '../../../shared/Icon'
import { IconButton } from '../../../shared/IconButton'
import { Modal } from '../../../shared/Modal'
import { useToggle } from '../../../shared/useToggle'
import { Bookmark } from '../Bookmark/Bookmark'
import { IllustQueryResult, useBookmarkMutation } from '../illustQuery'

export type BookmarkButtonProps = IllustQueryResult & {
  id: string
}

const title = [
  getHotkeyHint(KEY_ASSIGNMENT.bookmark),
  getHotkeyHint(KEY_ASSIGNMENT.bookmarkPrivate),
  getHotkeyHint(KEY_ASSIGNMENT.openBookmarkForm),
].join('\n')

export function BookmarkButton({ id, data, isSuccess }: BookmarkButtonProps) {
  const { mutate, isLoading: isMutating } = useBookmarkMutation(id)
  const { isOpen, open, close, toggle } = useToggle()

  if (!isSuccess || !data || !data.isBookmarkable)
    return (
      <IconButton type="button" disabled title={title}>
        <BookmarkOffIcon />
      </IconButton>
    )

  const { bookmarkData } = data
  const isBookmarked = !!bookmarkData
  const bookmark = () => mutate({})
  const bookmarkPrivate = () => mutate({ restrict: true })

  return (
    <>
      <IconButton
        type="button"
        title={title}
        onClick={(e) => {
          if (e.ctrlKey) return open()
          if (e.shiftKey) return bookmarkPrivate()
          bookmark()
        }}
        disabled={isMutating}
      >
        {isBookmarked ? (
          <BookmarkOnIcon css={{ color: '$secondary' }} />
        ) : (
          <BookmarkOffIcon />
        )}
      </IconButton>
      <Modal open={isOpen} onClose={close}>
        <Bookmark
          {...data}
          onSubmit={(data) => {
            mutate(data)
            close()
          }}
        />
      </Modal>
      <Hotkey
        {...KEY_ASSIGNMENT.bookmark}
        disabled={isMutating}
        onKeydown={bookmark}
      />
      <Hotkey
        {...KEY_ASSIGNMENT.bookmarkPrivate}
        disabled={isMutating}
        onKeydown={bookmarkPrivate}
      />
      <Hotkey
        {...KEY_ASSIGNMENT.openBookmarkForm}
        disabled={isMutating}
        onKeydown={toggle}
      />
    </>
  )
}
