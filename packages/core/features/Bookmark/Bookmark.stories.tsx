import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { useState } from 'react'
import { Works } from '../../mocks/data/works'
import { Bookmark } from './Bookmark'

export default {
  title: 'Features/Bookmark',
  component: Bookmark,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof Bookmark>

const keys = Object.keys(Works)

function App() {
  const [idx, setIdx] = useState(0)
  const illustId = keys[idx]
  const handleClick = () => {
    const isLast = idx === keys.length - 1
    setIdx(isLast ? 0 : idx + 1)
  }

  return (
    <div>
      <button onClick={handleClick}>Change Data</button>
      <hr />
      <Bookmark info={Works[illustId]} onSubmit={action('submit')} />
    </div>
  )
}

export const bookmark: ComponentStory<typeof App> = () => <App />
