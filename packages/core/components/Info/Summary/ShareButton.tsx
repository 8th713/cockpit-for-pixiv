import React from 'react'
import { AsyncStatus } from '../../../interfaces'
import { IllustProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Tweet } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants/keyMap'

const title = getDesc('share')

export function ShareButton() {
  const result = IllustProvider.useValue()
  const { share } = IllustProvider.useAction()
  const disabled = result.status !== AsyncStatus.Success

  return (
    <Button v="icon" disabled={disabled} onClick={share} title={title}>
      <Tweet />
      <Hotkeys {...keyMap.share} disabled={disabled} onKeyDown={share} />
    </Button>
  )
}
