import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Kbd } from './Kbd'

export default {
  title: 'Shared/Kbd',
  component: Kbd,
  parameters: {
    viewMode: 'docs',
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof Kbd>

const Template: ComponentStory<typeof Kbd> = (args) => <Kbd {...args} />

export const Single = Template.bind({})
Single.args = {
  children: 't',
}

export const Combination = Template.bind({})
Combination.args = {
  children: 'shift+F',
}
