import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Badge } from './Badge'

export default {
  title: 'Shared/Badge',
  component: Badge,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof Badge>

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />

export const Count = Template.bind({})
Count.args = {
  children: 15,
}

export const MaxCount = Template.bind({})
MaxCount.args = {
  children: 3,
  max: 10,
}
