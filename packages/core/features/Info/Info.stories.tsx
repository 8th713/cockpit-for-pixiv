import { Meta, Story } from '@storybook/react'
import { Works } from '../../mocks/data/works'
import { Info, InfoProps } from './Info'

export default {
  title: 'Features/Info',
  component: Info,
  argTypes: {
    id: {
      control: {
        type: 'radio',
        options: [...Object.keys(Works), '0'],
      },
    },
  },
  args: {
    id: Object.keys(Works)[0],
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      disable: true,
    },
  },
  decorators: [
    (Story) => (
      <>
        <div style={{ height: '180vh' }} />
        <Story />
      </>
    ),
  ],
} as Meta

export const info: Story<InfoProps> = (args) => <Info {...args} />
