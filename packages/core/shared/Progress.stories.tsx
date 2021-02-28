import { Meta, Story } from '@storybook/react'
import { Progress, ProgressProps } from './Progress'

export default {
  title: 'Shared/Progress',
  component: Progress,
} as Meta<ProgressProps>

export const Default: Story<ProgressProps> = (args) => <Progress {...args} />
Default.args = {
  size: undefined,
}
Default.storyName = 'Progress'
