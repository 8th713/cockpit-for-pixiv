import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Works } from '../../mocks/data/works'
import { RecentWorks } from './RecentWorks'

export default {
  title: 'Features/RecentWorks',
  component: RecentWorks,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof RecentWorks>

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
      <RecentWorks illustId={illustId} />
    </div>
  )
}

export const recentWorks: ComponentStory<typeof App> = () => <App />
recentWorks.storyName = 'RecentWorks'
