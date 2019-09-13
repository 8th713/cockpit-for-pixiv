import React from 'react'
import { Dialog, Modal, Text } from '../../components'
import { LABEL } from '../../constants'
import { useAbout } from './AboutProvider'
import { HotkeyList } from './HotkeyList'
import { Signature } from './Signature'

export const About = () => {
  const [open, setOpen] = useAbout()
  const handleClose = () => setOpen(false)

  return (
    <Modal open={open} onClose={handleClose}>
      <Dialog onBackdropClick={handleClose}>
        <Dialog.Header>
          <Text textStyle="h1">{LABEL}</Text>
        </Dialog.Header>
        <Dialog.Content>
          <Signature />
          <HotkeyList />
        </Dialog.Content>
      </Dialog>
    </Modal>
  )
}
