import React, { useContext } from 'react'
import { getDesc, keyMap } from '../../../constants'
import { IllustContext } from '../../../contexts'
import { useToggle } from '../../../hooks'
import { BookmarkPost } from '../../../interfaces'
import { Bookmark } from '../../Bookmark'
import { Hotkeys } from '../../Hotkeys'
import { Button } from '../../shared/Button'
import { BookmarkOff, BookmarkOn } from '../../shared/Icon'

const title = [
  getDesc('bookmark'),
  getDesc('privateBookmark'),
  getDesc('openBookmark')
].join('\n')

export function BookmarkButton() {
  const { read, bookmark } = useContext(IllustContext)
  const [opened, toggle] = useToggle(false)
  const illust = read()

  function handleBookmark(event: { shiftKey: boolean; ctrlKey: boolean }) {
    if (event.ctrlKey) return toggle()

    bookmark({ restrict: event.shiftKey })
  }
  function handleSubmit(body: BookmarkPost) {
    bookmark(body)
    toggle(false)
  }

  if (!illust) {
    return <BookmarkButtonFallback />
  }
  if (illust.isBookmarkable === false) {
    return (
      <Button v="icon" disabled title={title}>
        <BookmarkOff />
      </Button>
    )
  }

  const bookmarked = !!illust.bookmarkData

  return (
    <>
      <Button v="icon" onClick={handleBookmark} title={title}>
        {bookmarked ? <BookmarkOn c="error" /> : <BookmarkOff />}
        <Hotkeys {...keyMap.bookmark} onKeyDown={handleBookmark} />
        <Hotkeys {...keyMap.privateBookmark} onKeyDown={handleBookmark} />
        <Hotkeys {...keyMap.openBookmark} onKeyDown={handleBookmark} />
      </Button>
      {opened && (
        <Bookmark
          illust={illust}
          open={opened}
          onRequestClose={toggle}
          onSubmit={handleSubmit}
        />
      )}
    </>
  )
}

export function BookmarkButtonFallback() {
  return (
    <Button v="icon" disabled title={title}>
      <BookmarkOff />
    </Button>
  )
}
