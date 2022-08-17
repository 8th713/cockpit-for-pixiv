import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Users } from '../../mocks/data/users'
import { Profile } from './Profile'

export default {
  title: 'Features/Profile',
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
      default: 'light',
    },
  },
} as ComponentMeta<typeof Profile>

function App({ id }: { id: string }) {
  const user: Pixiv.User = Users[id]

  return <Profile user={user} />
}

export const profile: ComponentStory<typeof App> = (args) => (
  <App id={args.id} />
)
