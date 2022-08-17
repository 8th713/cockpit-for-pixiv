import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from './Button'
import { Skeleton } from './Skeleton'

export default {
  title: 'Shared/Skeleton',
  component: Skeleton,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  children: 'Basic',
}

export const Size = Template.bind({})
Size.args = {
  width: '85%',
  height: '$md',
}

export const Loaded = Template.bind({})
Loaded.args = {
  loaded: true,
  children: <Button>Button</Button>,
}
