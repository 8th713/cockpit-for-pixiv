import { ComponentMeta } from '@storybook/react'
import { Box } from './Box'
import { Divider } from './Divider'

export default {
  title: 'Shared/Divider',
  component: Divider,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof Divider>

export const Horizontal = () => {
  return (
    <Box css={{ padding: '$3' }}>
      <Divider />
      <Box css={{ height: '$sm' }} />
      <Divider />
      <Box css={{ height: '$sm' }} />
      <Divider />
    </Box>
  )
}

export const Vertical = () => {
  return (
    <Box
      flex
      style={{
        height: 128,
        padding: 16,
      }}
    >
      <Box style={{ flexGrow: 1 }} />
      <Divider />
      <Box style={{ flexGrow: 1 }} />
    </Box>
  )
}
