import React from 'react'
import { LABEL } from '../../constants'
import { Dialog } from '../shared/Dialog'
import { Modal } from '../shared/Modal'
import { Text } from '../shared/Text'
import { useAbout } from './AboutHost'
import { HotkeyList } from './HotkeyList'
import { Signature } from './Signature'

export function About() {
  const [open, setOpen] = useAbout()
  const handleClose = () => setOpen(false)

  return (
    <Modal open={open} onClose={handleClose}>
      <Dialog onBackdropClick={handleClose}>
        <Dialog.Header>
          <Text kind="h1">{LABEL}</Text>
        </Dialog.Header>
        <Dialog.Content>
          <HotkeyList />
          <Signature />
        </Dialog.Content>
      </Dialog>
    </Modal>
  )
}
