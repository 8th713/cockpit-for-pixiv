import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Box, BoxProps } from './Box'

export default {
  title: 'Components/Box',
  component: Box,
} as Meta

const Template: Story<BoxProps> = (args) => <Box {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Text',
  css: {
    padding: '$2',
    backgroundColor: '$surface',
  },
}

export const Nest = Template.bind({})
Nest.args = {
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
