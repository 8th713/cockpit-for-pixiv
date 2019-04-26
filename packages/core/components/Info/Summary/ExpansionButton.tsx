import React from 'react'
import { getDesc, keyMap } from '../../../constants'
import { useExpansionContext } from '../../../hooks'
import { Hotkeys } from '../../Hotkeys'
import { Button } from '../../shared/Button'
import { ExpandLess, ExpandMore } from '../../shared/Icon'

const title = getDesc('info')

export function ExpansionButton() {
  const [opened, toggle] = useExpansionContext()

  function handleClick() {
    toggle()
  }

  return (
    <Button v="icon" onClick={handleClick} title={title}>
      {opened ? <ExpandLess /> : <ExpandMore />}
      <Hotkeys {...keyMap.info} onKeyDown={handleClick} />
    </Button>
  )
}
