import React, { useContext } from 'react'
import { SpreadProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Spread, SpreadNone, SpreadShift } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { SpreadStatus, keyMap, getDesc } from '../../../constants'

const title = getDesc('spread')

export function SpreadButton() {
  const value = useContext(SpreadProvider.ValueContext)
  const cycle = useContext(SpreadProvider.ActionContext)

  return (
    <Button v="icon" onClick={cycle} title={title}>
      {value === SpreadStatus.NONE && <SpreadNone />}
      {value === SpreadStatus.SPREAD && <Spread />}
      {value === SpreadStatus.SPREAD_SHIFT && <SpreadShift />}
      <Hotkeys {...keyMap.spread} onKeyDown={cycle} />
    </Button>
  )
}
