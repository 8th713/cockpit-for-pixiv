import React, { useRef } from 'react'
import {
  getHotkeyHint,
  Hotkey,
  IconButton,
  TwitterIcon
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'

const title = getHotkeyHint(KEY_ASSIGNMENT.share)

export const ShareButton = (props: Pixiv.Illust) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const action = () => ref.current!.click()

  return (
    <IconButton.Link
      ref={ref}
      href={createTwitterUrl(props)}
      target="_blank"
      rel="noopener referer"
      title={title}
    >
      <TwitterIcon />
      <Hotkey {...KEY_ASSIGNMENT.share} action={action} />
    </IconButton.Link>
  )
}

const Mock = () => (
  <IconButton disabled title={title}>
    <TwitterIcon />
  </IconButton>
)
ShareButton.Mock = Mock

const createTwitterUrl = ({ title, userName, id }: Pixiv.Illust) => {
  const url = new URL('https://twitter.com/intent/tweet')
  const text = `${title} | ${userName} #pixiv`
  const link = `https://www.pixiv.net/artworks/${id}`

  url.searchParams.set('text', text)
  url.searchParams.set('url', link)
  return url.href
}

if (__DEV__) {
  Mock.displayName = 'ShareButton.Mock'
}
