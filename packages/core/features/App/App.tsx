import { KEY_ASSIGNMENT } from '../../keyboardMap'
import { Hotkey } from '../../shared/Hotkey'
import { Modal } from '../../shared/Modal'
import { About } from '../About/About'
import { Preview } from '../Preview/Preview'
import { globalStyles } from './globalStyles'
import { useAttachGlobalEvents } from './useAttachGlobalEvents'
import { useUpdateFullscreen } from './useFullscreen'
import { useNavigate, useRouteId } from './useNavigate'

export interface AppProps {}

export function App({}: AppProps) {
  const navigate = useNavigate()
  const toggleFullscreen = useUpdateFullscreen()
  const illustId = useRouteId()
  const openen = Boolean(illustId)

  useAttachGlobalEvents(navigate)
  globalStyles()

  return (
    <>
      <Modal open={openen} onClose={() => navigate()}>
        <Preview illustId={illustId!} />
        <Hotkey
          {...KEY_ASSIGNMENT.fullSizeMode}
          onKeydown={() => toggleFullscreen()}
        />
      </Modal>
      <About />
    </>
  )
}
