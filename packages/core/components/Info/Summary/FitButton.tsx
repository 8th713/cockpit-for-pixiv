import React, { useContext } from 'react'
import { FitProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { FitContain, FitCover, FitNone } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { FitStatus, keyMap, getDesc } from '../../../constants'

const title = getDesc('fit')

export function FitButton() {
  const value = useContext(FitProvider.ValueContext)
  const cycle = useContext(FitProvider.ActionContext)

  return (
    <Button v="icon" onClick={cycle} title={title}>
      {value === FitStatus.CONTAIN && <FitContain />}
      {value === FitStatus.COVER && <FitCover />}
      {value === FitStatus.NONE && <FitNone />}
      <Hotkeys {...keyMap.fit} onKeyDown={cycle} />
    </Button>
  )
}
