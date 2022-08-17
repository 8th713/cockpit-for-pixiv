import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Avatar } from './Avatar'

export default {
  title: 'Shared/Avatar',
  component: Avatar,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Image = Template.bind({})
Image.args = {
  src: 'https://bit.ly/dan-abramov',
}

export const Fallback = Template.bind({})
Fallback.args = {}

export const Large = Template.bind({})
Large.args = {
  src: 'https://bit.ly/dan-abramov',
  size: 'lg',
}

export const LargeFallback = Template.bind({})
LargeFallback.args = {
  size: 'lg',
}
