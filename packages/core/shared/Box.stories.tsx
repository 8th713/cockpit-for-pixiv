import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Box } from './Box'

export default {
  title: 'Shared/Box',
  component: Box,
  parameters: {
    viewMode: 'docs',
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof Box>

const Template: ComponentStory<typeof Box> = (args) => (
  <Box {...args}>
    <Box
      css={{
        padding: '$2',
        backgroundColor: 'HotPink',
      }}
    >
      HotPink
    </Box>
    <Box
      css={{
        padding: '$2',
        backgroundColor: 'Lime',
      }}
    >
      Lime
    </Box>
    <Box
      css={{
        padding: '$2',
        backgroundColor: '$primary',
      }}
    >
      Primary Color
    </Box>
  </Box>
)

export const Basic = Template.bind({})

export const flex = Template.bind({})
flex.args = {
  flex: true,
}
flex.storyName = 'flex'

export const textStyle = Template.bind({})
textStyle.args = {
  textStyle: 'h1',
}
textStyle.storyName = 'textStyle'

export const noWrap: ComponentStory<typeof Box> = (args) => (
  <Box nowrap>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta culpa
    reprehenderit cum quibusdam. Deserunt dolores porro explicabo blanditiis
    commodi iusto, earum aliquam accusamus quae et nam iste deleniti adipisci
    dignissimos.
  </Box>
)
noWrap.storyName = 'nowrap'
