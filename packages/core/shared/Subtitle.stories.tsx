import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Subtitle } from './Box'

export default {
  title: 'Shared/Subtitle',
  component: Subtitle,
  parameters: {
    viewMode: 'docs',
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof Subtitle>

const Template: ComponentStory<typeof Subtitle> = (args) => (
  <Subtitle {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  children: 'A Subtitle Text',
}

export const LongTitle = Template.bind({})
LongTitle.args = {
  children: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta culpa
  reprehenderit cum quibusdam. Deserunt dolores porro explicabo blanditiis
  commodi iusto, earum aliquam accusamus quae et nam iste deleniti adipisci
  dignissimos.`,
}
