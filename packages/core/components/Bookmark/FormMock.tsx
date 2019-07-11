import React from 'react'
import styled from 'styled-components'
import { Dialog } from '../shared/Dialog'

type Props = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  action?: React.ReactNode
  children?: React.ReactNode
}

export function FormMock({ onSubmit, action, children }: Props) {
  return (
    <Root onSubmit={onSubmit}>
      <Dialog.Content>{children}</Dialog.Content>
      <Dialog.Divider />
      <Dialog.Action>{action}</Dialog.Action>
    </Root>
  )
}

const Root = styled.form`
  display: contents;
`
const FlexContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 912px;
  align-items: start;
`
const FlexItem = styled.div`
  align-self: center;
  flex: 1;
  text-align: center;
`
const Thumbnail = styled.img`
  all: unset;
  position: sticky;
  top: 0;
  width: 240px;
  margin-right: 24px;
`

FormMock.FlexContainer = FlexContainer
FormMock.FlexItem = FlexItem
FormMock.Thumbnail = Thumbnail
