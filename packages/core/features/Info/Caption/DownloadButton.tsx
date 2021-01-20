import React from 'react'
import { getHotkeyHint, KEY_ASSIGNMENT } from '../../../keyboardMap'
import { Hotkey } from '../../../shared/Hotkey'
import { DownloadIcon } from '../../../shared/Icon'
import { IconButton } from '../../../shared/IconButton'
import { useGetPages } from '../../Preview/pagesQuery'
import type { IllustQueryResult } from '../illustQuery'
import { useAddon } from '../infoState'

export type DownloadButtonProps = IllustQueryResult & {
  id: string
}

const title = getHotkeyHint(KEY_ASSIGNMENT.download)

export const DownloadButton = ({ id, data }: DownloadButtonProps) => {
  const addon = useAddon()
  const getPages = useGetPages()
  const download = () => {
    const pages = getPages(id)

    if (!data || !pages) return

    const action = {
      type: 'DOWNLOAD',
      payload: { work: data, pages },
    }

    addon.dispatch('DOWNLOAD', action)
  }

  return (
    <IconButton type="button" disabled={!data} title={title} onClick={download}>
      <DownloadIcon />
      <Hotkey
        {...KEY_ASSIGNMENT.download}
        disabled={!data}
        onKeydown={download}
      />
    </IconButton>
  )
}
