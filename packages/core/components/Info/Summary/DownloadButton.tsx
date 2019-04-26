import React from 'react'
import { getDesc, keyMap } from '../../../constants'
import { useIllustContext } from '../../../hooks'
import { Hotkeys } from '../../Hotkeys'
import { Button } from '../../shared/Button'
import { Download } from '../../shared/Icon'

const title = getDesc('download')

export function DownloadButton() {
  const { read, download, canDonwload } = useIllustContext()
  const disabled = !canDonwload
  const illust = read()

  if (!illust) return <DownloadButtonFallback />

  return (
    <Button v="icon" disabled={disabled} onClick={download} title={title}>
      <Download />
      <Hotkeys {...keyMap.download} disabled={disabled} onKeyDown={download} />
    </Button>
  )
}

export function DownloadButtonFallback() {
  return (
    <Button v="icon" disabled title={title}>
      <Download />
    </Button>
  )
}
