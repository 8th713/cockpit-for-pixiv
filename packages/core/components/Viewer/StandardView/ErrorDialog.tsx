import React from 'react'
import { Button } from '../../shared/Button'
import { Dialog } from '../../shared/Dialog'
import { Text } from '../../shared/Text'

type Props = {
  id: string
  onClick: () => void
}

export function ErrorDialog({ id, onClick }: Props) {
  return (
    <Dialog onClick={e => e.stopPropagation()} backdrop={false}>
      <Dialog.Content>
        <Text>リクエストに失敗しました[id: {id}]</Text>
      </Dialog.Content>
      <Dialog.Action>
        <Button kind="contained" onClick={onClick}>
          Retry
        </Button>
      </Dialog.Action>
    </Dialog>
  )
}
