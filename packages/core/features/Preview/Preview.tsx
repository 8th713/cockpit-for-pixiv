import { useFullscreen } from '../App/useFullscreen'
import { BasicView } from './BasicView'
import { FullscreenView } from './FullscreenView'

export interface PreviewProps {
  illustId: string
}

export function Preview({ illustId }: PreviewProps) {
  const [isFullscreen] = useFullscreen()

  return (
    <>
      <BasicView illustId={illustId} />
      {isFullscreen && <FullscreenView illustId={illustId} />}
    </>
  )
}
