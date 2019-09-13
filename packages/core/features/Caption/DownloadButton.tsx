import React from 'react'
import {
  DownloadIcon,
  getHotkeyHint,
  Hotkey,
  IconButton
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { useAddon } from '../Addon'
import { useIllust } from '../Illust'
import { useRouteId } from '../Router'

const title = getHotkeyHint(KEY_ASSIGNMENT.download)

export const DownloadButton = () => {
  const addonStore = useAddon()
  const id = useRouteId()
  const illust = useIllust(id)
  const canDownload = addonStore.isConnected('download')

  if (!illust) return <DownloadButtonMock />

  const download = () => {
    if (canDownload === false) return

    const action: CFPAddon.DownloadRequestAction = {
      type: 'DOWNLOAD_REQUEST',
      payload: illust
    }

    addonStore.dispatch('download', action)
  }

  return (
    <IconButton onClick={download} title={title} disabled={!canDownload}>
      <DownloadIcon />
      <Hotkey {...KEY_ASSIGNMENT.download} action={download} />
    </IconButton>
  )
}

export const DownloadButtonMock = () => {
  return (
    <IconButton disabled title={title}>
      <DownloadIcon />
    </IconButton>
  )
}
