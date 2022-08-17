import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Switch } from './Switch'

export default {
  title: 'Shared/Switch',
  component: Switch,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: '有効',
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: '有効',
}
