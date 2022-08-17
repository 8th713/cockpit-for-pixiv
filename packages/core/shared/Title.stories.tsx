import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Title } from './Box'

export default {
  title: 'Shared/Title',
  component: Title,
  parameters: {
    viewMode: 'docs',
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof Title>

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: 'A Title Text',
}

export const LongTitle = Template.bind({})
LongTitle.args = {
  children: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta culpa
  reprehenderit cum quibusdam. Deserunt dolores porro explicabo blanditiis
  commodi iusto, earum aliquam accusamus quae et nam iste deleniti adipisci
  dignissimos.`,
}
