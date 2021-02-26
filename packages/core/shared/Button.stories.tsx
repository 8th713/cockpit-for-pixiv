import { Meta } from '@storybook/react'
import { Badge } from './Badge'
import { Flex } from './Box'
import { Button } from './Button'
import { FollowingIcon, FollowIcon } from './Icon'

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <Flex
        css={{
          gap: '$2',
        }}
      >
        <Story />
      </Flex>
    ),
  ],
} as Meta

export const Variants = () => (
  <>
    <Button>Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outlined">Outlined</Button>
    <Button variant="inherit">Inherit</Button>
  </>
)

export const Disabled = () => (
  <>
    <Button disabled>Default</Button>
    <Button disabled variant="secondary">
      Secondary
    </Button>
    <Button disabled variant="outlined">
      Outlined
    </Button>
    <Button disabled variant="inherit">
      Inherit
    </Button>
  </>
)

export const WithIcon = () => (
  <>
    <Button>
      <FollowIcon css={{ color: '#600' }} />
      Default
    </Button>
    <Button variant="secondary">
      Secondary
      <FollowingIcon />
    </Button>
    <Button variant="outlined">
      <FollowIcon />
      Outlined
    </Button>
    <Button variant="inherit">
      <FollowingIcon />
      Inherit
    </Button>
  </>
)

export const WithBadge = () => (
  <>
    <Button>
      Default<Badge>5</Badge>
    </Button>
    <Button variant="secondary">
      Secondary<Badge>5</Badge>
    </Button>
    <Button variant="outlined">
      Outlined<Badge>5</Badge>
    </Button>
    <Button variant="inherit">
      Inherit<Badge>5</Badge>
    </Button>
  </>
)
