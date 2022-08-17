import { useRef } from 'react'
import { KEY_ASSIGNMENT, toButtonTitle } from '../../keyboardMap'
import { Hotkey } from '../../shared/Hotkey'
import { IconButton, IconLink } from '../../shared/IconButton'
import { TwitterIcon } from '../../shared/Icons'

export interface ShareButtonProps {
  info?: Pixiv.IllustInfo
}

const title = toButtonTitle(KEY_ASSIGNMENT.share)

export function ShareButton({ info }: ShareButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  if (!info)
    return (
      <IconButton type="button" disabled title={title}>
        <TwitterIcon />
      </IconButton>
    )

  return (
    <IconLink
      ref={ref}
      href={createTwitterUrl(info)}
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

function createTwitterUrl({ title, userName, id }: Pixiv.IllustInfo) {
  const url = new URL('https://twitter.com/intent/tweet')
  const text = `${title} | ${userName} #pixiv`
  const link = `https://www.pixiv.net/artworks/${id}`

  url.searchParams.set('text', text)
  url.searchParams.set('url', link)
  return url.href
}
