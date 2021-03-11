import { Meta, Story } from '@storybook/react'
import { Flex } from './Box'
import { BookmarkOnIcon, DateTimeIcon, LikeIcon, ViewCountIcon } from './Icon'
import { Stat, StatProps } from './Stat'

export default {
  title: 'Shared/Stat',
  component: Stat,
} as Meta<StatProps>

export const Example: Story = () => (
  <Flex
    css={{
      gap: '$2',
    }}
  >
    <Stat icon={LikeIcon} value={1200} title="いいね！" />
    <Stat icon={BookmarkOnIcon} value={456} title="ブックマーク" />
    <Stat icon={ViewCountIcon} value={78945} title="閲覧数" />
    <Stat
      icon={DateTimeIcon}
      value="2020-11-11T15:30:00+00:00"
      title="更新日"
    />
  </Flex>
)
Example.storyName = 'Stat'
