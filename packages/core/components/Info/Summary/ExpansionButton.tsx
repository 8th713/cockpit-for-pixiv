import React, { useContext } from 'react'
import { ExpansionProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { ExpandLess, ExpandMore } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants'

const title = getDesc('info')

export function ExpansionButton() {
  const opened = useContext(ExpansionProvider.ValueContext)
  const toggle = useContext(ExpansionProvider.ActionContext)
  const handleClick = toggle.bind(null, undefined)

  return (
    <Button v="icon" onClick={handleClick} title={title}>
      {opened ? <ExpandLess /> : <ExpandMore />}
      <Hotkeys {...keyMap.info} onKeyDown={handleClick} />
    </Button>
  )
}
