import { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Bookmark } from './Bookmark'
import { Works } from '../../../mocks/data/works'

export default {
  title: 'Features/Info/Bookmark',
  component: Bookmark,
  argTypes: {
    id: {
      control: {
        type: 'radio',
        options: [...Object.keys(Works)],
      },
    },
  },
  args: {
    id: Object.keys(Works)[0],
  },
  parameters: {
    backgrounds: {
      disable: true,
    },
  },
} as Meta

export const bookmark: Story<{ id: string }> = (args) => {
  const props = Works[args.id]

  return <Bookmark {...props} onSubmit={action('submit')} />
}
