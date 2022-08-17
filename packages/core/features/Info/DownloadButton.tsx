import { KEY_ASSIGNMENT, toButtonTitle } from '../../keyboardMap'
import { Hotkey } from '../../shared/Hotkey'
import { IconButton } from '../../shared/IconButton'
import { DownloadIcon } from '../../shared/Icons'
import { useAddon } from '../App/useAddon'
import { useGetImages } from '../Preview/imagesQuery'

export interface DownloadButtonProps {
  info?: Pixiv.IllustInfo
}

const title = toButtonTitle(KEY_ASSIGNMENT.download)

export function DownloadButton({ info }: DownloadButtonProps) {
  const addon = useAddon()
  const getImages = useGetImages()

  if (!addon.isConnected('DOWNLOAD-ADDON')) return null

  const download = () => {
    if (!info) return

    const images = getImages(info.illustId)

    if (!images) return

    const action: Addon.DownloadRequest = {
      method: 'DOWNLOAD',
      args: { info, images },
    }

    console.log(action)
    addon.dispatch('DOWNLOAD-ADDON', action)
  }

  return (
    <IconButton type="button" title={title} onClick={download} disabled={!info}>
      <DownloadIcon />
      <Hotkey
        {...KEY_ASSIGNMENT.download}
        disabled={!info}
        onKeydown={download}
      />
    </IconButton>
  )
}
