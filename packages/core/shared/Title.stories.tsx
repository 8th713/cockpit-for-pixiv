import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Title, TitleProps } from './Text'

export default {
  title: 'Components/Title',
  component: Title,
} as Meta

const Template: Story<TitleProps> = (args) => <Title {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'テキスト Text',
}

export const LongText = Template.bind({})
LongText.args = {
  children:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero corrupti aspernatur voluptate expedita esse accusantium provident rerum quisquam deleniti cum dolorum fuga saepe, doloribus consequuntur cupiditate laboriosam suscipit? Ducimus, sit.',
}

export const LongTextEllipsis = Template.bind({})
LongTextEllipsis.args = {
  children:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero corrupti aspernatur voluptate expedita esse accusantium provident rerum quisquam deleniti cum dolorum fuga saepe, doloribus consequuntur cupiditate laboriosam suscipit? Ducimus, sit.',
  css: {
    ellipsis: 'none',
  },
}
