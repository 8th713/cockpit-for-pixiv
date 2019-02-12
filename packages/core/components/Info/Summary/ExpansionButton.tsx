import React, { useContext } from 'react'
import { InfoActionContext, InfoValueContext } from '../../../contexts'
import { Button } from '../../shared/Button'
import { ExpandLess, ExpandMore } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants'

const title = getDesc('info')

export function ExpansionButton() {
  const opened = useContext(InfoValueContext)
  const toggle = useContext(InfoActionContext)
  const handleClick = toggle.bind(null, undefined)

  return (
    <Button v="icon" onClick={handleClick} title={title}>
      {opened ? <ExpandLess /> : <ExpandMore />}
      <Hotkeys {...keyMap.info} onKeyDown={handleClick} />
    </Button>
  )
}
