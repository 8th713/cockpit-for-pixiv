import { ComponentMeta } from '@storybook/react'
import { About } from './About'

export default {
  title: 'Features/About',
  component: About,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof About>

export { About }
