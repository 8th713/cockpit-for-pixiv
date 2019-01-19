import React from 'react'
import { SpreadStatus } from '../../../interfaces'
import { SpreadProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Spread, SpreadNone, SpreadShift } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants/keyMap'

const title = getDesc('spread')

export function SpreadButton() {
  const value = SpreadProvider.useValue()
  const cycle = SpreadProvider.useAction()

  return (
    <Button v="icon" onClick={cycle} title={title}>
      {value === SpreadStatus.NONE && <SpreadNone />}
      {value === SpreadStatus.SPREAD && <Spread />}
      {value === SpreadStatus.SPREAD_SHIFT && <SpreadShift />}
      <Hotkeys {...keyMap.spread} onKeyDown={cycle} />
    </Button>
  )
}
