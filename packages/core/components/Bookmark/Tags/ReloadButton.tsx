import React, { useContext } from 'react'
import { UserTagsProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Refresh } from '../../shared/Icon'

export function ReloadButton() {
  const { retry } = useContext(UserTagsProvider.Context)

  return (
    <Button v="icon" type="button" onClick={retry} title="再読込">
      <Refresh />
    </Button>
  )
}
