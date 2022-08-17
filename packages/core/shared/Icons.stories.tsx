import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box, Subtitle } from './Box'
import { SvgIcon } from './createIcon'
import * as icons from './Icons'

export default {
  title: 'Shared/Icons',
  component: SvgIcon,
  parameters: {
    viewMode: 'docs',
  },
} as ComponentMeta<typeof SvgIcon>

export const Icons: ComponentStory<typeof SvgIcon> = (args) => {
  return (
    <Box
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 200px)',
        gap: '$2',
      }}
    >
      {Object.entries(icons).map(([key, Icon]) => (
        <Box
          key={key}
          css={{
            padding: '$2',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '$primary',
            borderRadius: 4,
            color: '$onSurface',
            textAlign: 'center',
          }}
        >
          <Icon {...args} />
          <Subtitle>{key}</Subtitle>
        </Box>
      ))}
    </Box>
  )
}
