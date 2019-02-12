import React, { useContext } from 'react'
import { IllustContext } from '../../../contexts'
import { Button } from '../../shared/Button'
import { Download } from '../../shared/Icon'
import { Hotkeys } from '../../Hotkeys'
import { keyMap, getDesc } from '../../../constants'

const title = getDesc('download')

export function DownloadButton() {
  const { read, download, canDonwload } = useContext(IllustContext)
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
