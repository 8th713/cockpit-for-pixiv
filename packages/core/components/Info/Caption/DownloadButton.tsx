import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { DownloadRequestAction } from '../../../interfaces'
import { useRouteId } from '../../Router'
import { useServices } from '../../Services'
import { Download, Hotkey, IconButton } from '../../shared'
import { getTitle } from '../utils'

const title = getTitle(KEY_ASSIGNMENT.download)

export function DownloadButton() {
  const { useIllust, addonStore } = useServices()
  const id = useRouteId()
  const illust = useIllust(id)
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
    <IconButton onClick={download} title={title} disabled={!canDownload}>
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
