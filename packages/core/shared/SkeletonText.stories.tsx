import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SkeletonText } from './Skeleton'

export default {
  title: 'Shared/SkeletonText',
  component: SkeletonText,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof SkeletonText>

const Template: ComponentStory<typeof SkeletonText> = (args) => (
  <SkeletonText {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  children: 'Basic',
}

export const Lines = Template.bind({})
Lines.args = {
  children: 'Lines',
  lines: 4,
}

export const Variant = Template.bind({})
Variant.args = {
  textStyle: '$h1',
  lines: 4,
}

export const Loaded = Template.bind({})
Loaded.args = {
  loaded: true,
  textStyle: '$h1',
  lines: 4,
  children: 'Basic',
}
