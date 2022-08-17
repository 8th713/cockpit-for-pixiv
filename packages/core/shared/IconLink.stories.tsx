import { ComponentStory, ComponentMeta } from '@storybook/react'
import { IconLink } from './IconButton'
import { AddIcon } from './Icons'

export default {
  title: 'Shared/IconLink',
  component: IconLink,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof IconLink>

const Template: ComponentStory<typeof IconLink> = (args) => (
  <IconLink {...args}>
    <AddIcon />
  </IconLink>
)

export const Inherit = Template.bind({})
Inherit.args = {
  children: 'Button',
}

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  children: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
  children: 'Button',
}

export const Circle = Template.bind({})
Circle.args = {
  variant: 'circle',
  children: 'Button',
}
