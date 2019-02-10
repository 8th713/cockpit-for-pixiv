import React from 'react'
import { useToggle } from '../hooks'

type Props = {
  children?: React.ReactNode
}

const ValueContext = React.createContext(false)
const ActionContext = React.createContext((newValue?: boolean) => {})

export function AboutProvider(props: Props) {
  const [opened, toggle] = useToggle(false)

  return (
    <ActionContext.Provider value={toggle}>
      <ValueContext.Provider value={opened}>
        {props.children}
      </ValueContext.Provider>
    </ActionContext.Provider>
  )
}
AboutProvider.ValueContext = ValueContext
AboutProvider.ActionContext = ActionContext
