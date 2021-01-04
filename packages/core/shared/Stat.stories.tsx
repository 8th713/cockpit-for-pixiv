import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Flex } from './Box'
import { BookmarkOnIcon, DateTimeIcon, LikeIcon, ViewCountIcon } from './Icon'
import { Stat, StatProps } from './Stat'

export default {
  title: 'Components/Stat',
  component: Stat,
} as Meta

const Template: Story<StatProps> = (args) => <Stat {...args} />

export const Count = Template.bind({})
Count.args = {
  value: 1200,
  icon: LikeIcon,
}

export const Date = Template.bind({})
Date.args = {
  value: '2020-11-11T15:30:00+00:00',
  icon: DateTimeIcon,
}

export const Collection = () => (
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
