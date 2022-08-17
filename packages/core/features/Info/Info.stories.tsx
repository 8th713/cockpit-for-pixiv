import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Works } from '../../mocks/data/works'
import { Info } from './Info'

export default {
  title: 'Features/Info',
  component: Info,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof Info>

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
      <Info illustId={illustId} />
    </div>
  )
}

export const info: ComponentStory<typeof App> = () => <App />
