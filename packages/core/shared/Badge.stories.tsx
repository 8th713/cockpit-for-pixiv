import { Meta } from '@storybook/react'
import { Badge, BadgeProps } from './Badge'

export default {
  title: 'Shared/Badge',
  component: Badge,
} as Meta<BadgeProps>

export const Default = () => <Badge>5</Badge>

export const BigValue = () => <Badge>10000</Badge>
