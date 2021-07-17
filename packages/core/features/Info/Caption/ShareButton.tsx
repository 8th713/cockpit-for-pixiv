import { useRef } from 'react'
import { getHotkeyHint, KEY_ASSIGNMENT } from '../../../keyboardMap'
import { Hotkey } from '../../../shared/Hotkey'
import { TwitterIcon } from '../../../shared/Icon'
import { IconButton } from '../../../shared/IconButton'
import type { IllustQueryResult } from '../illustQuery'

export type ShareButtonProps = IllustQueryResult & {
  id: string
}

const title = getHotkeyHint(KEY_ASSIGNMENT.share)

export function ShareButton({ data, id }: ShareButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  if (!data)
    return (
      <IconButton type="button" disabled title={title}>
        <TwitterIcon />
      </IconButton>
    )

  return (
    <IconButton
      as="a"
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
    </IconButton>
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
