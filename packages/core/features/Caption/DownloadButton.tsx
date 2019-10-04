import React from 'react'
import {
  DownloadIcon,
  getHotkeyHint,
  Hotkey,
  IconButton
} from '../../components'
import { KEY_ASSIGNMENT } from '../../constants'
import { useAddon } from '../Addon'

const title = getHotkeyHint(KEY_ASSIGNMENT.download)

export const DownloadButton = (props: Pixiv.Illust) => {
  const addonStore = useAddon()
  const canDownload = addonStore.isConnected('download')
  const download = () => {
    if (canDownload === false) return

    const action: CFPAddon.DownloadRequestAction = {
      type: 'DOWNLOAD_REQUEST',
      payload: props
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

const Mock = () => (
  <IconButton disabled title={title}>
    <DownloadIcon />
  </IconButton>
)
DownloadButton.Mock = Mock

if (__DEV__) {
  Mock.displayName = 'DownloadButton.Mock'
}
