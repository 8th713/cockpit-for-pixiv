import { Meta, Story } from '@storybook/react'
import { Box, Grid, GridProps } from './Box'

export default {
  title: 'Components/Grid',
  component: Grid,
} as Meta

const Template: Story<GridProps> = (args) => <Grid {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Text',
}

export const Nest = Template.bind({})
Nest.args = {
  css: {
    gridTemplateColumns: '40% 1fr',
    gap: '$2',
  },
  children: (
    <>
      <Box
        css={{
          padding: '$2',
          backgroundColor: '$primary',
          color: '$onPrimary',
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
