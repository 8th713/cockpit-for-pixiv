import React from 'react'
import { AsyncStatus } from '../../../interfaces'
import { IllustProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Refresh } from '../../shared/Icon'

export const RefreshButton = React.memo(function RefreshButton() {
  const result = IllustProvider.useValue()
  const { retry } = IllustProvider.useAction()

  if (result.status === AsyncStatus.Failure) {
    return (
      <Button v="icon" onClick={retry} title="再読込">
        <Refresh />
      </Button>
    )
  }
  return null
})
