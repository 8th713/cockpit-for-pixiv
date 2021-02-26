import { Meta, Story } from '@storybook/react'
import { Subtitle, SubtitleProps } from './Text'

export default {
  title: 'Components/Subtitle',
  component: Subtitle,
} as Meta

const Template: Story<SubtitleProps> = (args) => <Subtitle {...args} />

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
