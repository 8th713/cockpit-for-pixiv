import { KEY_ASSIGNMENT } from '../../keyboardMap'
import { Hotkey } from '../../shared/Hotkey'
import { Modal } from '../../shared/Modal'
import { About } from './About'
import { useAbout, useSetAbout } from './aboutState'

export interface AboutManagerProps {
  title: string
}

export const AboutManager = ({ title }: AboutManagerProps) => {
  const isOpen = useAbout()
  const { close, toggle } = useSetAbout()

  return (
    <>
      <Hotkey {...KEY_ASSIGNMENT.help} onKeydown={toggle} />
      <Modal open={isOpen} onClose={close}>
        <About title={title} />
      </Modal>
    </>
  )
}
