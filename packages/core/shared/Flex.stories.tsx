import { Meta, Story } from '@storybook/react'
import { Box, Flex, FlexProps } from './Box'

export default {
  title: 'Components/Flex',
  component: Flex,
} as Meta

const Template: Story<FlexProps> = (args) => <Flex {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Text',
}

export const Nest = Template.bind({})
Nest.args = {
  css: {
    gap: '$2',
  },
  children: (
    <>
      <Box
        css={{
          padding: '$2',
          backgroundColor: '$primary',
          color: '$onPrimary',
          flexGrow: 1,
        }}
      >
        Primary
      </Box>
      <Box
        css={{
          padding: '$2',
          backgroundColor: '$secondary',
          color: '$onSecondary',
        }}
      >
        Secondary
      </Box>
    </>
  ),
}
