import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Switch as Component, SwitchProps } from './Switch'

export default {
  title: 'Components/Switch',
  component: Component,
} as Meta

export const Switch: Story<SwitchProps> = (args) => <Component {...args} />
Switch.args = {
  children: 'Label text',
}
Switch.argTypes = {
  onChange: {
    action: 'changed',
  },
}
