import { useRef } from 'react'
import { getHotkeyHint, KEY_ASSIGNMENT } from '../../../keyboardMap'
import { Hotkey } from '../../../shared/Hotkey'
import { TwitterIcon } from '../../../shared/Icon'
import { IconButton, IconLink } from '../../../shared/IconButton'
import type { IllustQueryResult } from '../illustQuery'

export type ShareButtonProps = IllustQueryResult & {
  id: string
}

const title = getHotkeyHint(KEY_ASSIGNMENT.share)

export const ShareButton = ({ data, id }: ShareButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null)

  if (!data)
    return (
      <IconButton type="button" disabled title={title}>
        <TwitterIcon />
      </IconButton>
    )

  return (
    <IconLink
      ref={ref}
      href={createTwitterUrl(data)}
      target="_blank"
      rel="noopener referer"
      title={title}
    >
      <TwitterIcon />
      <Hotkey
        {...KEY_ASSIGNMENT.share}
        onKeydown={() => ref.current!.click()}
      />
    </IconLink>
  )
}

const createTwitterUrl = ({ title, userName, id }: Pixiv.Illust) => {
  const url = new URL('https://twitter.com/intent/tweet')
  const text = `${title} | ${userName} #pixiv`
  const link = `https://www.pixiv.net/artworks/${id}`

  url.searchParams.set('text', text)
  url.searchParams.set('url', link)
  return url.href
}
