import { Meta, Story } from '@storybook/react'
import { ArtWorks } from '../../mocks/data/artWorks'
import { Box } from '../../shared/Box'
import { Info } from '../Info/Info'
import { Preview, PreviewProps } from './Preview'

export default {
  title: 'Features/Preview',
  component: Preview,
  argTypes: {
    id: {
      control: {
        type: 'radio',
        options: [...Object.keys(ArtWorks), '0'],
      },
    },
  },
  args: {
    id: Object.keys(ArtWorks)[3],
  },
  parameters: {
    backgrounds: {
      default: 'bg',
    },
  },
  decorators: [
    (Story) => (
      <Box css={{ cover: 0, overflow: 'auto' }}>
        <Story />
      </Box>
    ),
  ],
} as Meta<PreviewProps>

export const preview: Story<PreviewProps> = (args) => (
  <Preview {...args}>
    <Info {...args} />
  </Preview>
)
