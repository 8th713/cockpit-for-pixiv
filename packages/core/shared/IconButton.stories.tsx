import { Meta } from '@storybook/react'
import { Flex } from './Box'
import {
  BookmarkOffIcon,
  BookmarkOnIcon,
  FollowingIcon,
  FollowIcon,
} from './Icon'
import { IconButton, IconLink } from './IconButton'

export default {
  title: 'Components/IconButton',
  component: IconButton,
} as Meta

export const iconButton = () => (
  <Flex css={{ gap: '$2' }}>
    <IconButton css={{ color: '$secondary' }}>
      <BookmarkOnIcon />
    </IconButton>
    <IconButton>
      <BookmarkOffIcon />
    </IconButton>
    <IconButton disabled css={{ color: '$secondary' }}>
      <BookmarkOnIcon />
    </IconButton>
    <IconButton disabled>
      <BookmarkOffIcon />
    </IconButton>
  </Flex>
)

export const iconLink = () => (
  <Flex css={{ gap: '$2' }}>
    <IconLink href="#" onClick={(e) => e.preventDefault()}>
      <FollowIcon />
    </IconLink>
    <IconLink href="#" onClick={(e) => e.preventDefault()}>
      <FollowingIcon />
    </IconLink>
  </Flex>
)

export const circle = () => (
  <Flex css={{ gap: '$2' }}>
    <IconButton variant="circle" css={{ color: '$secondary' }}>
      <BookmarkOnIcon />
    </IconButton>
    <IconButton variant="circle">
      <BookmarkOffIcon />
    </IconButton>
    <IconButton variant="circle" disabled css={{ color: '$secondary' }}>
      <BookmarkOnIcon />
    </IconButton>
    <IconButton variant="circle" disabled>
      <BookmarkOffIcon />
    </IconButton>
  </Flex>
)
