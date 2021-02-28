import { Meta, Story } from '@storybook/react'
import { Switch, SwitchProps } from './Switch'

export default {
  title: 'Shared/Switch',
  component: Switch,
} as Meta

export const Example: Story<SwitchProps> = (args) => <Switch {...args} />
Example.args = {
  children: 'Label text',
}
Example.argTypes = {
  onChange: {
    action: 'changed',
  },
}
Example.storyName = 'Switch'
