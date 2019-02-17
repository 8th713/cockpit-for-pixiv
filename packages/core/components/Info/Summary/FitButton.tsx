import React from 'react'
import { FitStatus, getDesc, keyMap } from '../../../constants'
import { FitProvider } from '../../../contexts'
import { Hotkeys } from '../../Hotkeys'
import { Button } from '../../shared/Button'
import { FitContain, FitCover, FitNone } from '../../shared/Icon'

const title = getDesc('fit')

export function FitButton() {
  const [value, cycle] = FitProvider.use()

  return (
    <Button v="icon" onClick={cycle} title={title}>
      {value === FitStatus.CONTAIN && <FitContain />}
      {value === FitStatus.COVER && <FitCover />}
      {value === FitStatus.NONE && <FitNone />}
      <Hotkeys {...keyMap.fit} onKeyDown={cycle} />
    </Button>
  )
}
