import React from 'react'
import { IllustProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Refresh } from '../../shared/Icon'

export function RefreshButton() {
  const { read, retry } = IllustProvider.useValue()

  try {
    read()
    return null
  } catch (error) {
    if (error && error.then) {
      throw error
    }
    return (
      <Button v="icon" onClick={retry} title="再読込">
        <Refresh />
      </Button>
    )
  }
}
