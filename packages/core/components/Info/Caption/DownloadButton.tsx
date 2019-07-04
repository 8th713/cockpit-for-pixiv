import React from 'react'
import { KEY_ASSIGNMENT } from '../../../constants'
import { DownloadRequestAction } from '../../../interfaces'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { Hotkey } from '../../shared/Hotkey'
import { Download } from '../../shared/Icon'
import { IconButton } from '../../shared/IconButton'
import { getTitle } from '../utils'

const title = getTitle(KEY_ASSIGNMENT.download)

export function DownloadButton() {
  const { apiClient, addonStore } = useServices()
  const { read } = apiClient.useIllust()
  const id = useRoute()[0]!
  const illust = read(id)
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
