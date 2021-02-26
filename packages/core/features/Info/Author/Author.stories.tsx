import { Meta, Story } from '@storybook/react'
import { Works } from '../../../mocks/data/works'
import { Author, AuthorProps } from './Author'

export default {
  title: 'Features/Info/Author',
  component: Author,
  argTypes: {
    illustId: {
      control: {
        type: 'radio',
        options: [...Object.keys(Works), '0'],
      },
    },
  },
  args: {
    illustId: Object.keys(Works)[0],
  },
  parameters: {
    backgrounds: {
      disable: true,
    },
  },
} as Meta

export const author: Story<AuthorProps> = (args) => <Author {...args} />
