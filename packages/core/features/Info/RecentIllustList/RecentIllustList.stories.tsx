import { Meta, Story } from '@storybook/react'
import { Works } from '../../../mocks/data/works'
import { RecentIllustList, RecentIllustListProps } from './RecentIllustList'

export default {
  title: 'Features/Info/Recent Illust List',
  component: RecentIllustList,
  argTypes: {
    id: {
      control: {
        type: 'radio',
        options: [...Object.keys(Works), '0'],
      },
    },
  },
  args: {
    id: Object.keys(Works)[0],
  },
  parameters: {
    backgrounds: {
      disable: true,
    },
  },
} as Meta

export const recentIllustList: Story<RecentIllustListProps> = (args) => (
  <RecentIllustList {...args} />
)
