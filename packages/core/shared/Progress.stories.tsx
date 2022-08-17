import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Progress } from './Progress'

export default {
  title: 'Shared/Progress',
  component: Progress,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof Progress>

const Template: ComponentStory<typeof Progress> = (args) => (
  <Progress {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
}

export const Large = Template.bind({})
Large.args = {}

export const Medium = Template.bind({})
Medium.args = {
  size: 'md',
}

export const Small = Template.bind({})
Small.args = {
  size: 'sm',
}
