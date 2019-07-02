import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { DownloadRequestAction } from '../../../interfaces'
import { useServices } from '../../Services'
import { Hotkey } from '../../shared/Hotkey'
import { Download } from '../../shared/Icon'
import { IconButton } from '../../shared/IconButton'
import { useIllust } from '../IllustHost'
import { getTitle } from '../utils'

const title = getTitle(KEY_ASSIGNMENT.download)

export function DownloadButton() {
  const { addonStore } = useServices()
  const { read } = useIllust()
  const illust = read()
  const canDownload = addonStore.isConnected('download')

  if (!illust) return <DownloadButtonMock />
  const download = () => {
    if (canDownload === false) return

    const action: DownloadRequestAction = {
      type: 'DOWNLOAD_REQUEST',
      payload: illust
    }

    addonStore.dispatch('download', action)
  }

  return (
    <IconButton onClick={download} title={title}>
      <Download />
      <Hotkey {...KEY_ASSIGNMENT.download} action={download} />
    </IconButton>
  )
}

export function DownloadButtonMock() {
  return (
    <IconButton disabled title={title}>
      <Download />
    </IconButton>
  )
}
