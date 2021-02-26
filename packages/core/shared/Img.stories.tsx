import { Meta, Story } from '@storybook/react'
import { Img, ImgProps } from './Img'

export default {
  title: 'Components/Img',
  component: Img,
} as Meta

const Template: Story<ImgProps> = (args) => <Img {...args} />

export const Default = Template.bind({})
Default.args = {
  src: 'https://bit.ly/dan-abramov',
}
