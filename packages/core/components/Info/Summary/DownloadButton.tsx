import React from 'react'
import { IllustProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Download } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants'

const title = getDesc('download')

export function DownloadButton() {
  const { read, download, canDonwload } = IllustProvider.useValue()
  const disabled = !canDonwload

  try {
    read()
    return (
      <Button v="icon" disabled={disabled} onClick={download} title={title}>
        <Download />
        <Hotkeys
          {...keyMap.download}
          disabled={disabled}
          onKeyDown={download}
        />
      </Button>
    )
  } catch (error) {
    if (error && error.then) {
      throw error
    }
    return <DownloadButtonFallback />
  }
}

export function DownloadButtonFallback() {
  return (
    <Button v="icon" disabled title={title}>
      <Download />
    </Button>
  )
}
