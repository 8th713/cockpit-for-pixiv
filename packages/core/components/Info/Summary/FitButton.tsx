import React from 'react'
import { FitStatus } from '../../../interfaces'
import { FitProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { FitContain, FitCover, FitNone } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants/keyMap'

const title = getDesc('fit')

export const FitButton = React.memo(function FitButton() {
  const value = FitProvider.useValue()
  const cycle = FitProvider.useAction()

  return (
    <Button v="icon" onClick={cycle} title={title}>
      {value === FitStatus.CONTAIN && <FitContain />}
      {value === FitStatus.COVER && <FitCover />}
      {value === FitStatus.NONE && <FitNone />}
      <Hotkeys {...keyMap.fit} onKeyDown={cycle} />
    </Button>
  )
})
