import React from 'react'
import { AsyncStatus } from '../../../interfaces'
import { IllustProvider } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Download } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants/keyMap'

const title = getDesc('download')

export const DownloadButton = React.memo(function DownloadButton() {
  const result = IllustProvider.useValue()
  const { download, canDonwload } = IllustProvider.useAction()
  const disabled =
    result.status !== AsyncStatus.Success || canDonwload() === false

  return (
    <Button v="icon" disabled={disabled} onClick={download} title={title}>
      <Download />
      <Hotkeys {...keyMap.download} disabled={disabled} onKeyDown={download} />
    </Button>
  )
})
