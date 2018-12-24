import React from 'react'
import { AsyncStatus, BookmarkPost } from '../../../interfaces'
import { IllustProvider } from '../../../contexts'
import { useToggle } from '../../../hooks'
import { Button } from '../../shared/Button'
import { BookmarkOff, BookmarkOn } from '../../shared/Icon'
import { Bookmark } from '../../Bookmark'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants/keyMap'

const title = [
  getDesc('bookmark'),
  getDesc('privateBookmark'),
  getDesc('openBookmark')
].join('\n')

export const BookmarkButton = React.memo(function BookmarkButton() {
  const result = IllustProvider.useValue()
  const { bookmark } = IllustProvider.useAction()
  const [opened, toggle] = useToggle(false)
  const handleBookmark = React.useCallback(
    function(event: { shiftKey: boolean; ctrlKey: boolean }) {
      if (event.ctrlKey) {
        toggle()
        return
      }
      bookmark({ restrict: event.shiftKey })
    },
    [bookmark, toggle]
  )
  const handleSubmit = React.useCallback(
    function(post: BookmarkPost) {
      bookmark(post)
      toggle(false)
    },
    [bookmark, toggle]
  )

  if (result.status !== AsyncStatus.Success) {
    return (
      <Button v="icon" disabled title={title}>
        <BookmarkOff />
      </Button>
    )
  }

  const { value } = result

  if (value.isBookmarkable === false) {
    return (
      <Button v="icon" disabled title={title}>
        <BookmarkOff />
      </Button>
    )
  }

  const bookmarked = !!value.bookmarkData
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
          illust={value}
          open={opened}
          onRequestClose={toggle}
          onSubmit={handleSubmit}
        />
      )}
    </>
  )
})
