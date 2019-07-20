import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { openTwitter } from '../../../externals/share'
import { useRouteId } from '../../Router'
import { useServices } from '../../Services'
import { Hotkey, IconButton, Tweet } from '../../shared'
import { getTitle } from '../utils'

const title = getTitle(KEY_ASSIGNMENT.share)

export function ShareButton() {
  const { useIllust } = useServices()
  const id = useRouteId()
  const illust = useIllust(id)

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
