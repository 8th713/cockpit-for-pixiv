import { ComponentStory, ComponentMeta } from '@storybook/react'
import { IconButton } from './IconButton'
import { AddIcon } from './Icons'
import { SkeletonCircle } from './Skeleton'

export default {
  title: 'Shared/SkeletonCircle',
  component: SkeletonCircle,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof SkeletonCircle>

const Template: ComponentStory<typeof SkeletonCircle> = (args) => (
  <SkeletonCircle {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  children: 'Basic',
}

export const Size = Template.bind({})
Size.args = {
  size: 24,
}

export const Loaded = Template.bind({})
Loaded.args = {
  loaded: true,
  children: (
    <IconButton variant="primary">
      <AddIcon />
    </IconButton>
  ),
}
