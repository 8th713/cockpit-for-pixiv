import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { Bookmark, useUpdateToggleForm } from '../../Bookmark'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { Hotkey } from '../../shared/Hotkey'
import { BookmarkOff, BookmarkOn } from '../../shared/Icon'
import { IconButton } from '../../shared/IconButton'
import { bookmark, getTitle } from '../utils'

const title = [
  getTitle(KEY_ASSIGNMENT.bookmark),
  getTitle(KEY_ASSIGNMENT.bookmarkPrivate),
  getTitle(KEY_ASSIGNMENT.openBookmarkForm)
].join('\n')

export function BookmarkButton() {
  const setOpen = useUpdateToggleForm()
  const { useIllust, bookmarkBy } = useServices()
  const id = useRoute()[0]!
  const illust = useIllust(id)

  if (!illust) return <BookmarkButtonMock />

  const { bookmarkData, isBookmarkable } = illust

  if (!isBookmarkable)
    return (
      <IconButton disabled title={title}>
        <BookmarkOff />
      </IconButton>
    )

  const bookmarked = !!bookmarkData
  const color = bookmarked ? 'error' : undefined
  const icon = bookmarked ? <BookmarkOn /> : <BookmarkOff />
  const handleBookmark = (event: { shiftKey: boolean; ctrlKey: boolean }) => {
    if (!isBookmarkable) return
    if (event.ctrlKey) return setOpen(true)

    useIllust.replace(id, bookmark(illust, event.shiftKey))
    bookmarkBy(id, { restrict: event.shiftKey }).finally(() =>
      useIllust.refresh(id)
    )
  }

  return (
    <>
      <IconButton onClick={handleBookmark} title={title} color={color}>
        {icon}
        <Hotkey {...KEY_ASSIGNMENT.bookmark} action={handleBookmark} />
        <Hotkey {...KEY_ASSIGNMENT.bookmarkPrivate} action={handleBookmark} />
        <Hotkey {...KEY_ASSIGNMENT.openBookmarkForm} action={handleBookmark} />
      </IconButton>
      <Bookmark illust={illust} />
    </>
  )
}

export function BookmarkButtonMock() {
  return (
    <IconButton disabled title={title}>
      <BookmarkOff />
    </IconButton>
  )
}
