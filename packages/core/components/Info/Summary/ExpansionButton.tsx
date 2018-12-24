import React from 'react'
import { ExpansionProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { ExpandLess, ExpandMore } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants/keyMap'

const title = getDesc('info')

export const ExpansionButton = React.memo(function ExpansionButton() {
  const opened = ExpansionProvider.useValue()
  const toggle = ExpansionProvider.useAction()
  const handleClick = React.useCallback(() => toggle(), [toggle])

  return (
    <Button v="icon" onClick={handleClick} title={title}>
      {opened ? <ExpandLess /> : <ExpandMore />}
      <Hotkeys {...keyMap.info} onKeyDown={handleClick} />
    </Button>
  )
})
