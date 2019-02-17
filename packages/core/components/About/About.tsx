import React from 'react'
import { keyMap } from '../../constants'
import { AboutProvider } from '../../contexts'
import { Hotkeys } from '../Hotkeys'
import { Dialog } from '../shared/Dialog'
import { Divider } from '../shared/Divider'
import { Text } from '../shared/Text'
import { PaddingEditor } from './PaddingEditor'
import { ShortcutsList } from './ShortcutsList'
import { Signature } from './Signature'

export function About() {
  const [opened, toggle] = AboutProvider.use()

  function handleRequestClose() {
    toggle()
  }

  return (
    <Dialog open={opened} onRequestClose={handleRequestClose}>
      <Dialog.Header>
        <Text as="h1" v="h6">
          {GM_info.script.name} - {GM_info.script.version}
        </Text>
      </Dialog.Header>
      <Divider m={24} />
      <Dialog.Content>
        <PaddingEditor />
        <ShortcutsList />
        <Signature />
      </Dialog.Content>
      <Hotkeys {...keyMap.help} onKeyDown={handleRequestClose} />
    </Dialog>
  )
}
