import React from 'react'
import { AboutProvider } from '../../contexts'
import { PaddingEditor } from './PaddingEditor'
import { ShortcutsList } from './ShortcutsList'
import { Signature } from './Signature'
import { Dialog } from '../shared/Dialog'
import { Text } from '../shared/Text'
import { Divider } from '../shared/Divider'
import { Hotkeys } from '../Hotkeys'
import { keyMap } from '../../constants/keyMap'

export function About() {
  const opened = AboutProvider.useValue()
  const toggle = AboutProvider.useAction()
  const handleRequestClose = React.useCallback(() => toggle(), [])

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
