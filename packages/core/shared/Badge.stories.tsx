import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Badge, BadgeProps } from './Badge'

export default {
  title: 'Components/Badge',
  component: Badge,
} as Meta

const Template: Story<BadgeProps> = (args) => <Badge {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 5,
}

export const BigValue = Template.bind({})
BigValue.args = {
  children: 10000,
}
