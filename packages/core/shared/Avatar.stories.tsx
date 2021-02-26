import { Meta, Story } from '@storybook/react'
import { Avatar, AvatarProps } from './Avatar'

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as Meta

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />

export const WithoutSrc = Template.bind({})

export const WithSrc = Template.bind({})
WithSrc.args = { src: 'https://bit.ly/dan-abramov' }

export const WithSize = Template.bind({})
WithSize.args = { size: 64 }
