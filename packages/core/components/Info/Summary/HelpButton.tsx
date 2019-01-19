import React from 'react'
import { AboutProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Help } from '../../shared/Icon'
import { getDesc } from '../../../constants/keyMap'

const title = getDesc('help')

export function HelpButton() {
  const toggle = AboutProvider.useAction()
  const fromEvent = React.useCallback(() => toggle(), [toggle])

  return (
    <Button v="icon" onClick={fromEvent} title={title}>
      <Help />
    </Button>
  )
}
