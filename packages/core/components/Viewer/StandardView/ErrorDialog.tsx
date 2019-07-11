import React from 'react'
import { useServices } from '../../Services'
import { Button } from '../../shared/Button'
import { Dialog } from '../../shared/Dialog'
import { Refresh } from '../../shared/Icon'
import { Text } from '../../shared/Text'

type Props = {
  id: string
}

export function ErrorDialog({ id }: Props) {
  const { usePages } = useServices()

  return (
    <Dialog onClick={e => e.stopPropagation()} backdrop={false}>
      <Dialog.Content>
        <Text>リクエストに失敗しました[id: {id}]</Text>
      </Dialog.Content>
      <Dialog.Action>
        <Button
          variant="contained"
          colors="error"
          onClick={() => usePages.remove(id)}
        >
          <Refresh size={18} mr={2} />
          再取得
        </Button>
      </Dialog.Action>
    </Dialog>
  )
}
