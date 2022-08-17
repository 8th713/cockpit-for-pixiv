import { ComponentStory, ComponentMeta } from '@storybook/react'
import { IconButton } from './IconButton'
import { AddIcon } from './Icons'

export default {
  title: 'Shared/IconButton',
  component: IconButton,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof IconButton>

const Template: ComponentStory<typeof IconButton> = (args) => (
  <div style={{ display: 'flex', gap: 8 }}>
    <IconButton {...args}>
      <AddIcon />
    </IconButton>
    <IconButton disabled {...args}>
      <AddIcon />
    </IconButton>
    <IconButton loading {...args}>
      <AddIcon />
    </IconButton>
  </div>
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
