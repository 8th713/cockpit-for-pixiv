import { Meta } from '@storybook/react'
import { Skeleton, SkeletonProps } from './Box'

export default {
  title: 'Shared/Skeleton',
  component: Skeleton,
} as Meta<SkeletonProps>

export const Rectangular = () => <Skeleton css={{ width: '25%' }} />

export const Circular = () => (
  <Skeleton variant="circular" css={{ size: '$lgH' }} />
)

export const Text = () => <Skeleton variant="text" />

export const TextWithTypoVariant = () => <Skeleton variant="text" typo="h1" />
