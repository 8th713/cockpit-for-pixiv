import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Badge } from './Badge'
import { Button } from './Button'
import { AddIcon } from './Icons'

export default {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Button {...args}>Button</Button>
    <Button disabled {...args}>
      Disabled
    </Button>
    <Button {...args}>
      <AddIcon />
      Prefix Icon
    </Button>
    <Button disabled {...args}>
      Suffix Icon
      <AddIcon />
    </Button>
    <Button {...args}>
      Prefix Badge
      <Badge>5</Badge>
    </Button>
    <Button disabled {...args}>
      Suffix Badge
      <Badge>5</Badge>
    </Button>
    <Button loading {...args}>
      Loading
    </Button>
  </div>
)

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
}

export const Outlined = Template.bind({})
Outlined.args = {
  variant: 'outlined',
}

export const Inherit = Template.bind({})
Inherit.args = {}
