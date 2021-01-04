import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Paragraph, Subtitle, Title, Word, WordProps } from './Text'

export default {
  title: 'Components/Word',
  component: Word,
} as Meta

const Template: Story<WordProps> = (args) => <Word {...args}>Word</Word>

export const Simple = Template.bind({})

export const WithParagraph = Template.bind({})
WithParagraph.args = {
  css: { color: '$primary' },
}
WithParagraph.decorators = [
  (Story) => (
    <Paragraph>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      <Story /> Lorem ipsum dolor sit amet consectetur, adipisicing elit.
    </Paragraph>
  ),
]

export const WithSubtitle = Template.bind({})
WithSubtitle.args = {
  ...WithParagraph.args,
}
WithSubtitle.decorators = [
  (Story) => (
    <Subtitle>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      <Story /> Lorem ipsum dolor sit amet consectetur, adipisicing elit.
    </Subtitle>
  ),
]

export const WithTitle = Template.bind({})
WithTitle.args = {
  ...WithParagraph.args,
}
WithTitle.decorators = [
  (Story) => (
    <Title>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      <Story /> Lorem ipsum dolor sit amet consectetur, adipisicing elit.
    </Title>
  ),
]
