import { Meta, Story } from '@storybook/react'
import { Progress, ProgressProps } from './Progress'

export default {
  title: 'Components/Progress',
  component: Progress,
} as Meta

const Template: Story<ProgressProps> = (args) => <Progress {...args} />

export const Default = Template.bind({})

export const WithSize = Template.bind({})
WithSize.args = {
  size: 64,
}
