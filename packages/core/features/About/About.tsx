import { KEY_ASSIGNMENT } from '../../keyboardMap'
import { Hotkey } from '../../shared/Hotkey'
import { Modal } from '../../shared/Modal'
import { useAbout } from './useAbout'
import { KeyMap } from './KeyMap'
import { Links } from './Links'
import { DialogBody, DialogContent, DialogHeader } from '../../shared/Dialog'
import { Title } from '../../shared/Box'
import { Divider } from '../../shared/Divider'

export interface AboutProps {}

export function About({}: AboutProps) {
  const [isOpen, toggleAbout] = useAbout()

  return (
    <>
      <Modal open={isOpen} onClose={() => toggleAbout(false)}>
        <DialogContent>
          <DialogHeader>
            <Title>{'Title'}</Title>
          </DialogHeader>
          <Divider css={{ marginX: '$4' }} />
          <DialogBody>
            <Links />
            <Divider css={{ marginY: '$2' }} />
            <KeyMap />
          </DialogBody>
        </DialogContent>
      </Modal>
      <Hotkey {...KEY_ASSIGNMENT.help} onKeydown={() => toggleAbout()} />
    </>
  )
}
