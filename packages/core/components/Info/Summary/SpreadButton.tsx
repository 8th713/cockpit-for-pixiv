import React from 'react'
import { getDesc, keyMap, SpreadStatus } from '../../../constants'
import { useSpreadContext } from '../../../hooks'
import { Hotkeys } from '../../Hotkeys'
import { Button } from '../../shared/Button'
import { Spread, SpreadNone, SpreadShift } from '../../shared/Icon'

const title = getDesc('spread')

export function SpreadButton() {
  const [value, cycle] = useSpreadContext()

  return (
    <Button v="icon" onClick={cycle} title={title}>
      {value === SpreadStatus.NONE && <SpreadNone />}
      {value === SpreadStatus.SPREAD && <Spread />}
      {value === SpreadStatus.SPREAD_SHIFT && <SpreadShift />}
      <Hotkeys {...keyMap.spread} onKeyDown={cycle} />
    </Button>
  )
}
