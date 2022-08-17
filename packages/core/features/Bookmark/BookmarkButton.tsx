import { KEY_ASSIGNMENT, toButtonTitle } from '../../keyboardMap'
import { Hotkey } from '../../shared/Hotkey'
import { IconButton } from '../../shared/IconButton'
import { BookmarkOffIcon, BookmarkOnIcon } from '../../shared/Icons'
import { Modal } from '../../shared/Modal'
import { useToggle } from '../../shared/useToggle'
import { Bookmark } from '../Bookmark/Bookmark'
import { useBookmarkMutation } from '../Info/infoQuery'

export interface BookmarkButtonProps {
  info?: Pixiv.IllustInfo
}

const title = [
  toButtonTitle(KEY_ASSIGNMENT.bookmark),
  toButtonTitle(KEY_ASSIGNMENT.bookmarkPrivate),
  toButtonTitle(KEY_ASSIGNMENT.openBookmarkForm),
].join('\n')

export function BookmarkButton({ info }: BookmarkButtonProps) {
  const { mutate, isLoading: isMutating } = useBookmarkMutation(info?.illustId!)
  const [isOpen, toggle] = useToggle()

  if (!info || !info.isBookmarkable)
    return (
      <IconButton type="button" disabled title={title}>
        <BookmarkOffIcon />
      </IconButton>
    )

  const { bookmarkData } = info
  const isBookmarked = !!bookmarkData
  const bookmark = () => mutate({})
  const bookmarkPrivate = () => mutate({ restrict: true })
  const close = () => toggle(false)

  return (
    <>
      <IconButton
        type="button"
        title={title}
        onClick={(e) => {
          if (e.ctrlKey) return toggle(true)
          if (e.shiftKey) return bookmarkPrivate()
          bookmark()
        }}
        disabled={isMutating}
      >
        {isBookmarked ? (
          <BookmarkOnIcon
            css={{
              color: '$secondary',
            }}
          />
        ) : (
          <BookmarkOffIcon />
        )}
      </IconButton>
      <Modal open={isOpen} onClose={close}>
        <Bookmark
          info={info}
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
        onKeydown={() => toggle()}
      />
    </>
  )
}
