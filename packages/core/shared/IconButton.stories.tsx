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
  title: 'Shared/IconButton',
  component: IconButton,
} as Meta

export const iconButton = () => (
  <Flex css={{ gap: '$2' }}>
    <IconButton color="secondary">
      <BookmarkOnIcon />
    </IconButton>
    <IconButton>
      <BookmarkOffIcon />
    </IconButton>
    <IconButton disabled color="secondary">
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
    <IconButton circle color="secondary">
      <BookmarkOnIcon />
    </IconButton>
    <IconButton circle>
      <BookmarkOffIcon />
    </IconButton>
    <IconButton circle disabled color="secondary">
      <BookmarkOnIcon />
    </IconButton>
    <IconButton circle disabled>
      <BookmarkOffIcon />
    </IconButton>
  </Flex>
)
