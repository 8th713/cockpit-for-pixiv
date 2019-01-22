import React from 'react'
import { IllustProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Tweet } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants'

const title = getDesc('share')

export function ShareButton() {
  const { read, share } = IllustProvider.useValue()

  try {
    read()
    return (
      <Button v="icon" onClick={share} title={title}>
        <Tweet />
        <Hotkeys {...keyMap.share} onKeyDown={share} />
      </Button>
    )
  } catch (error) {
    if (error && error.then) {
      throw error
    }
    return <ShareButtonFallback />
  }
}

export function ShareButtonFallback() {
  return (
    <Button v="icon" disabled title={title}>
      <Tweet />
    </Button>
  )
}
