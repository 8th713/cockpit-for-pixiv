import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Box, Grid } from './Box'
import { IconProps, SvgIcon } from './createIcon'
import { Subtitle } from './Text'
import * as icons from './Icon'

export default {
  title: 'Components/Icons',
  component: SvgIcon,
} as Meta

const Template: Story<IconProps> = (args) => (
  <Grid
    css={{
      gridTemplateColumns: 'repeat(auto-fill, 200px)',
      flexWrap: 'wrap',
      padding: '$2',
      gap: '$2',
    }}
  >
    {Object.entries(icons).map(([key, Icon]) => (
      <Box key={key} css={{ textAlign: 'center' }}>
        <Box>
          <Icon {...args} />
        </Box>
        <Subtitle>{key}</Subtitle>
      </Box>
    ))}
  </Grid>
)

export const Default = Template.bind({})
Default.args = {}

export const Primary = Template.bind({})
Primary.args = {
  css: {
    color: '$primary',
  },
}
