import React, { useContext } from 'react'
import { AboutProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Help } from '../../shared/Icon'
import { getDesc } from '../../../constants'

const title = getDesc('help')

export function HelpButton() {
  const toggle = useContext(AboutProvider.ActionContext)
  const handleClick = toggle.bind(null, undefined)

  return (
    <Button v="icon" onClick={handleClick} title={title}>
      <Help />
    </Button>
  )
}
