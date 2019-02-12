import React, { useContext } from 'react'
import { IllustContext } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Tweet } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants'

const title = getDesc('share')

export function ShareButton() {
  const { read, share } = useContext(IllustContext)
  const illust = read()

  if (!illust) {
    return <ShareButtonFallback />
  }

  return (
    <Button v="icon" onClick={share} title={title}>
      <Tweet />
      <Hotkeys {...keyMap.share} onKeyDown={share} />
    </Button>
  )
}

export function ShareButtonFallback() {
  return (
    <Button v="icon" disabled title={title}>
      <Tweet />
    </Button>
  )
}
