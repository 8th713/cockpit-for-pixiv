import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Users } from '../../../mocks/data/users'
import { Profile } from './Profile'

export default {
  title: 'Features/Info/Profile',
  component: Profile,
  argTypes: {
    id: {
      control: {
        type: 'radio',
        options: [...Object.keys(Users)],
      },
    },
  },
  args: {
    id: Object.keys(Users)[0],
  },
  parameters: {
    backgrounds: {
      disable: true,
    },
  },
} as Meta

export const profile: Story<{ id: string }> = (args) => {
  const props = Users[args.id]

  return <Profile {...props} />
}
