import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Works } from '../../mocks/data/works'
import { Author } from './Author'

export default {
  title: 'Features/Author',
  component: Author,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof Author>

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
      <Author illustId={illustId} />
    </div>
  )
}

export const author: ComponentStory<typeof App> = () => <App />
