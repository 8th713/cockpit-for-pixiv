import React from 'react'
import {
  getHotkeyHint,
  Hotkey,
  IconButton,
  TwitterIcon
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { openTwitter } from '../../externals/share'
import { useIllust } from '../Illust'
import { useRouteId } from '../Router'

const title = getHotkeyHint(KEY_ASSIGNMENT.share)

export const ShareButton = () => {
  const id = useRouteId()
  const illust = useIllust(id)

  if (!illust) return <ShareButtonMock />

  const share = () => openTwitter(illust)

  return (
    <IconButton onClick={share} title={title}>
      <TwitterIcon />
      <Hotkey {...KEY_ASSIGNMENT.share} action={share} />
    </IconButton>
  )
}

export const ShareButtonMock = () => {
  return (
    <IconButton disabled title={title}>
      <TwitterIcon />
    </IconButton>
  )
}
