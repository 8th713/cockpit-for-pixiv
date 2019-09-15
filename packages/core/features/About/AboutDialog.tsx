import React from 'react'
import { Dialog, Modal, Text } from '../../components'
import { LABEL } from '../../constants'
import { HotkeyList } from './HotkeyList'
import { Signature } from './Signature'

type Props = {
  open: boolean
  onClose: () => void
}

export const AboutDialog = ({ open, onClose }: Props) => (
  <Modal open={open} onClose={onClose}>
    <Dialog onBackdropClick={onClose}>
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
