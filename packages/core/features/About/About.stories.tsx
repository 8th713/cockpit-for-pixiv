import { Meta, Story } from '@storybook/react'
import { About, AboutProps } from './About'
import { AboutButton } from '../Info/Caption/AboutButton'
import { AboutManager } from './AboutManager'

export default {
  title: 'Features/About',
  component: About,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta<AboutProps>

export const about: Story = () => <About title="About" />

export const manager: Story = () => (
  <>
    <AboutButton />
    <AboutManager title="About" />
  </>
)
