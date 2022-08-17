import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Works } from '../mocks/data/works'
import { HTMLText } from './HTMLText'

export default {
  title: 'Shared/HTMLText',
  component: HTMLText,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof HTMLText>

const Template: ComponentStory<typeof HTMLText> = (args) => (
  <HTMLText {...args} />
)

const work = Works[86087070]

export const Basic = Template.bind({})
Basic.args = {
  children: work.description,
}
