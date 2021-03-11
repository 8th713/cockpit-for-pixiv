import { Meta, Story } from '@storybook/react'
import { Box, Grid } from './Box'
import { IconProps, SvgIcon } from './createIcon'
import * as icons from './Icon'

export default {
  title: 'Shared/Icons',
  component: SvgIcon,
} as Meta<IconProps>

export const Default: Story<IconProps> = (args) => (
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
        <Box typo="h2">{key}</Box>
      </Box>
    ))}
  </Grid>
)

export const WithColor = Default.bind({})
WithColor.args = {
  css: {
    color: '$primary',
  },
}
