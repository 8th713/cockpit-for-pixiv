import { Meta, Story } from '@storybook/react'
import React from 'react'
import { TextField, TextFieldProps } from './TextField'

export default {
  title: 'Components/TextField',
  component: TextField,
} as Meta

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'comment',
  maxLength: 140,
  label: 'ブックマークコメント',
  counter: '0/140',
}

export const Invalid = Template.bind({})
Invalid.args = {
  name: 'comment',
  invalid: true,
  label: 'ブックマークコメント',
  message: 'over than ten',
}
