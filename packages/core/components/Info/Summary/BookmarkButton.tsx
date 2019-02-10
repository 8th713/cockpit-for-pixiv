import React, { useContext } from 'react'
import { BookmarkPost } from '../../../interfaces'
import { IllustProvider } from '../../../contexts'
import { useToggle } from '../../../hooks'
import { Button } from '../../shared/Button'
import { BookmarkOff, BookmarkOn } from '../../shared/Icon'
import { Bookmark } from '../../Bookmark'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants'

const title = [
  getDesc('bookmark'),
  getDesc('privateBookmark'),
  getDesc('openBookmark')
].join('\n')

export function BookmarkButton() {
  const { read, bookmark } = useContext(IllustProvider.Context)
  const [opened, toggle] = useToggle(false)
  const handleBookmark = React.useCallback(
    (event: { shiftKey: boolean; ctrlKey: boolean }) => {
      if (event.ctrlKey) {
        toggle()
        return
      }
      bookmark({ restrict: event.shiftKey })
    },
    [bookmark, toggle]
  )
  const handleSubmit = React.useCallback(
    (post: BookmarkPost) => {
      bookmark(post)
      toggle(false)
    },
    [bookmark, toggle]
  )
  const illust = read()

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
