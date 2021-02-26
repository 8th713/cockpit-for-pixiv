import { Meta, Story } from '@storybook/react'
import { ArtWorks } from '../../../mocks/data/artWorks'
import { Box } from '../../../shared/Box'
import { Info } from '../../Info/Info'
import { ImageList } from '../ImageList/ImageList'
import { FullSize, FullSizeProps } from './FullSize'

export default {
  title: 'Features/Preview/Full Size',
  component: FullSize,
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
      default: 'bg',
    },
  },
} as Meta<FullSizeProps>

export const fullSize: Story<FullSizeProps> = (args) => (
  <>
    <Box css={{ cover: 0, overflow: 'auto' }}>
      <ImageList {...args} />
      <Info {...args} />
    </Box>
    <FullSize {...args} />
  </>
)
