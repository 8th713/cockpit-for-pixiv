import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { Bookmark, useUpdateToggleForm } from '../../Bookmark'
import { useRouteId } from '../../Router'
import { useServices } from '../../Services'
import {
  BookmarkOff,
  BookmarkOn,
  getHotkeyHint,
  Hotkey,
  IconButton
} from '../../shared'
import { bookmark } from '../utils'

const title = [
  getHotkeyHint(KEY_ASSIGNMENT.bookmark),
  getHotkeyHint(KEY_ASSIGNMENT.bookmarkPrivate),
  getHotkeyHint(KEY_ASSIGNMENT.openBookmarkForm)
].join('\n')

export function BookmarkButton() {
  const setOpen = useUpdateToggleForm()
  const { useIllust, bookmarkBy } = useServices()
  const id = useRouteId()
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
  const icon = bookmarked ? <BookmarkOn color="error" /> : <BookmarkOff />
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
