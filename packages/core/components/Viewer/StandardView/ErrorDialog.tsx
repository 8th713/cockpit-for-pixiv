import React from 'react'
import { useServices } from '../../Services'
import { Button } from '../../shared/Button'
import { Dialog } from '../../shared/Dialog'
import { Text } from '../../shared/Text'

type Props = {
  id: string
}

export function ErrorDialog({ id }: Props) {
  const { apiClient } = useServices()

  return (
    <Dialog onClick={e => e.stopPropagation()} backdrop={false}>
      <Dialog.Content>
        <Text>リクエストに失敗しました[id: {id}]</Text>
      </Dialog.Content>
      <Dialog.Action>
        <Button kind="contained" onClick={() => apiClient.usePages.remove(id)}>
          Retry
        </Button>
      </Dialog.Action>
    </Dialog>
  )
}
