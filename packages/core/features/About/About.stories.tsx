import { Meta, Story } from '@storybook/react'
import React from 'react'
import { About, AboutProps } from './About'
import { AboutButton } from '../Info/Caption/AboutButton'
import { AboutManager } from './AboutManager'

export default {
  title: 'Features/About',
  component: About,
} as Meta

export const about: Story<AboutProps> = (args) => <About {...args} />
about.args = {
  title: 'About',
}
about.parameters = {
  backgrounds: {
    disable: true,
  },
}

export const manager: Story<{}> = () => (
  <>
    <AboutButton />
    <AboutManager title="About" />
  </>
)
