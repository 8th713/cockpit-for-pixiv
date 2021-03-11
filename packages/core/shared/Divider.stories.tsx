import { Meta, Story } from '@storybook/react'
import { Box, Flex } from './Box'
import { Divider, DividerProps } from './Divider'

export default {
  title: 'Shared/Divider',
  component: Divider,
} as Meta

const Template: Story<DividerProps> = (args) => <Divider {...args} />

export const WithBox = Template.bind({})
WithBox.decorators = [
  (Story) => (
    <Box css={{ backgroundColor: '$surface' }}>
      <Box css={{ height: '$smH' }} />
      <Story />
      <Box css={{ height: '$smH' }} />
    </Box>
  ),
]

export const Inset = Template.bind({})
Inset.args = {
  css: { marginX: '$3' },
}
Inset.decorators = WithBox.decorators

export const WithFlexRow = Template.bind({})
WithFlexRow.decorators = [
  (Story) => (
    <Flex
      css={{
        flexDirection: 'row',
        backgroundColor: '$surface',
      }}
    >
      <Box css={{ flexGrow: 1, height: '$smH' }} />
      <Story />
      <Box css={{ flexGrow: 1, height: '$smH' }} />
    </Flex>
  ),
]

export const WithFlexColumn = Template.bind({})
WithFlexColumn.decorators = [
  (Story) => (
    <Flex
      css={{
        flexDirection: 'column',
        backgroundColor: '$surface',
      }}
    >
      <Box css={{ height: '$smH' }} />
      <Story />
      <Box css={{ height: '$smH' }} />
    </Flex>
  ),
]
