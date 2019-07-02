import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { openTwitter } from '../../../externals/share'
import { Hotkey } from '../../shared/Hotkey'
import { Tweet } from '../../shared/Icon'
import { IconButton } from '../../shared/IconButton'
import { useIllust } from '../IllustHost'
import { getTitle } from '../utils'

const title = getTitle(KEY_ASSIGNMENT.share)

export function ShareButton() {
  const { read } = useIllust()
  const illust = read()

  if (!illust) return <ShareButtonMock />
  const share = () => openTwitter(illust)

  return (
    <IconButton onClick={share} title={title}>
      <Tweet />
      <Hotkey {...KEY_ASSIGNMENT.share} action={share} />
    </IconButton>
  )
}

export function ShareButtonMock() {
  return (
    <IconButton disabled title={title}>
      <Tweet />
    </IconButton>
  )
}
