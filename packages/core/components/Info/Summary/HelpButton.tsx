import React from 'react'
import { getDesc } from '../../../constants'
import { useAboutContext } from '../../../hooks'
import { Button } from '../../shared/Button'
import { Help } from '../../shared/Icon'

const title = getDesc('help')

export function HelpButton() {
  const [, toggle] = useAboutContext()

  function handleClick() {
    toggle()
  }

  return (
    <Button v="icon" onClick={handleClick} title={title}>
      <Help />
    </Button>
  )
}
