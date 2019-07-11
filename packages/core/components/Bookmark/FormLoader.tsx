import React from 'react'
import { Illust } from '../../interfaces'
import { useServices } from '../Services'
import { Button } from '../shared/Button'
import { Refresh } from '../shared/Icon'
import { Text } from '../shared/Text'
import { Form } from './Form'
import { FormMock } from './FormMock'

type Props = {
  illust: Illust
  children?: React.ReactNode
}

export function FormLoader({ illust, children }: Props) {
  const { useBookmarkForm } = useServices()
  const form = useBookmarkForm(illust.id)

  if (!form)
    return (
      <FormMock
        onSubmit={e => {
          e.preventDefault()
          useBookmarkForm.remove(illust.id)
        }}
        action={
          <Button variant="contained" colors="error" type="submit">
            <Refresh size={18} mr={2} />
            再取得
          </Button>
        }
      >
        <FormMock.FlexContainer>
          {children}
          <FormMock.FlexItem>
            <Text color="error" m="auto">
              取得に失敗しました
            </Text>
          </FormMock.FlexItem>
        </FormMock.FlexContainer>
      </FormMock>
    )

  return (
    <Form illust={illust} data={form}>
      {children}
    </Form>
  )
}
