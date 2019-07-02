import React from 'react'
import { Button } from '../shared/Button'
import { Refresh } from '../shared/Icon'
import { Text } from '../shared/Text'
import { Form } from './Form'
import { useForm } from './FormHost'
import { FormMock } from './FormMock'

type Props = {
  children?: React.ReactNode
}

export function FormLoader({ children }: Props) {
  const { illust, read, reload } = useForm()
  const form = read()

  if (!form)
    return (
      <FormMock
        onSubmit={e => {
          e.preventDefault()
          reload()
        }}
        action={
          <Button kind="contained" color="error" type="submit">
            <Refresh mr={8} />
            再取得
          </Button>
        }
      >
        <FormMock.FlexContainer>
          {children}
          <FormMock.FlexItem>
            <Text as="span" color="error">
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
