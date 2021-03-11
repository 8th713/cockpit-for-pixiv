import { Meta, Story } from '@storybook/react'
import { ArtWorks } from '../../../mocks/data/artWorks'
import { Box } from '../../../shared/Box'
import { Info } from '../../Info/Info'
import { ImageList, ImageListProps } from './ImageList'

export default {
  title: 'Features/Preview/Image List',
  component: ImageList,
  argTypes: {
    id: {
      control: {
        type: 'radio',
        options: [...Object.keys(ArtWorks), '0'],
      },
    },
  },
  args: {
    id: Object.keys(ArtWorks)[0],
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta<ImageListProps>

export const imageList: Story<ImageListProps> = (args) => (
  <Box css={{ cover: 0, overflow: 'auto' }}>
    <ImageList {...args} />
    <Info {...args} />
  </Box>
)
