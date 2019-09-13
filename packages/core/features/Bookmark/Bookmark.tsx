import React, { useState } from 'react'
import {
  BookmarkOffIcon,
  BookmarkOnIcon,
  getHotkeyHint,
  Hotkey,
  IconButton
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { bookmark, bookmarkBy, useIllust } from '../Illust'
import { useRouteId } from '../Router'
import { BookmarkDialog } from './BookmarkDialog'

export const Bookmark = () => {
  const illustId = useRouteId()
  return <BookmarkButton key={illustId} illustId={illustId} />
}

type Props = { illustId: string }

const title = [
  getHotkeyHint(KEY_ASSIGNMENT.bookmark),
  getHotkeyHint(KEY_ASSIGNMENT.bookmarkPrivate),
  getHotkeyHint(KEY_ASSIGNMENT.openBookmarkForm)
].join('\n')

const BookmarkButton = ({ illustId }: Props) => {
  const [open, setOpen] = useState(false)
  const illust = useIllust(illustId)

  if (!illust) return <BookmarkButtonMock />

  const { bookmarkData, isBookmarkable } = illust

  if (!isBookmarkable)
    return (
      <IconButton disabled title={title}>
        <BookmarkOffIcon />
      </IconButton>
    )

  const bookmarked = !!bookmarkData
  const icon = bookmarked ? (
    <BookmarkOnIcon color="error" />
  ) : (
    <BookmarkOffIcon />
  )
  const handleBookmark = (event: { shiftKey: boolean; ctrlKey: boolean }) => {
    if (!isBookmarkable) return
    if (event.ctrlKey) return setOpen(true)

    useIllust.replace(illustId, bookmark(illust, event.shiftKey))
    bookmarkBy(illustId, { restrict: event.shiftKey }).finally(() =>
      useIllust.refresh(illustId)
    )
  }

  return (
    <>
      <IconButton onClick={handleBookmark} title={title}>
        {icon}
        <Hotkey {...KEY_ASSIGNMENT.bookmark} action={handleBookmark} />
        <Hotkey {...KEY_ASSIGNMENT.bookmarkPrivate} action={handleBookmark} />
        <Hotkey {...KEY_ASSIGNMENT.openBookmarkForm} action={handleBookmark} />
      </IconButton>
      <BookmarkDialog
        illust={illust}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export const BookmarkButtonMock = () => {
  return (
    <IconButton disabled title={title}>
      <BookmarkOffIcon />
    </IconButton>
  )
}
