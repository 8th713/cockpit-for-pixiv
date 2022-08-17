import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TextWithIcon } from './TextWithIcon'
import { LikeIcon } from './Icons'

export default {
  title: 'Shared/TextWithIcon',
  component: TextWithIcon,
  parameters: {
    viewMode: 'docs',
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof TextWithIcon>

const Template: ComponentStory<typeof TextWithIcon> = (args) => (
  <TextWithIcon {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  title: 'いいね！',
  icon: LikeIcon,
  children: 'A Text',
}
