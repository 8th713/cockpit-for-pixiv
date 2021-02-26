import { Meta, Story } from '@storybook/react'
import { Paragraph, ParagraphProps } from './Text'

export default {
  title: 'Components/Paragraph',
  component: Paragraph,
} as Meta

const Template: Story<ParagraphProps> = (args) => <Paragraph {...args} />

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
