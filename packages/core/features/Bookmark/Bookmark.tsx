import React, { useState } from 'react'
import {
  BookmarkOffIcon,
  BookmarkOnIcon,
  getHotkeyHint,
  Hotkey,
  IconButton,
  Modal
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { bookmark, bookmarkBy, useIllust } from '../Illust'
import { BookmarkDialog } from './BookmarkDialog'

const title = [
  getHotkeyHint(KEY_ASSIGNMENT.bookmark),
  getHotkeyHint(KEY_ASSIGNMENT.bookmarkPrivate),
  getHotkeyHint(KEY_ASSIGNMENT.openBookmarkForm)
].join('\n')

export const Bookmark = (props: Pixiv.Illust) => {
  const [open, setOpen] = useState(false)
  const { id, bookmarkData, isBookmarkable } = props

  if (!isBookmarkable) return <Mock />

  const bookmarked = !!bookmarkData
  const icon = bookmarked ? (
    <BookmarkOnIcon sx={{ color: 'secondary' }} />
  ) : (
    <BookmarkOffIcon />
  )
  const close = () => setOpen(false)
  const handleBookmark = (event: { shiftKey: boolean; ctrlKey: boolean }) => {
    if (!isBookmarkable) return
    if (event.ctrlKey) return setOpen(true)

    useIllust.replace(id, bookmark(props, event.shiftKey))
    bookmarkBy(id, { restrict: event.shiftKey }).finally(() =>
      useIllust.refresh(id)
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
      <Modal open={open} onClose={close} onBackdropClick={close}>
        <BookmarkDialog {...props} onSubmit={close} />
      </Modal>
    </>
  )
}

export const Mock = () => {
  return (
    <IconButton disabled title={title}>
      <BookmarkOffIcon />
    </IconButton>
  )
}
Bookmark.Mock = Mock

if (__DEV__) {
  Mock.displayName = 'Bookmark.Mock'
}
