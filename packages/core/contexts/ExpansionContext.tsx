import React from 'react'
import { useExpansion } from '../hooks'

type Props = {
  children?: React.ReactNode
}

const ValueContext = React.createContext(false)
const ActionContext = React.createContext((newValue?: boolean) => {})

export function ExpansionProvider(props: Props) {
  const [opened, toggle] = useExpansion()

  return (
    <ActionContext.Provider value={toggle}>
      <ValueContext.Provider value={opened}>
        {props.children}
      </ValueContext.Provider>
    </ActionContext.Provider>
  )
}
ExpansionProvider.ValueContext = ValueContext
ExpansionProvider.ActionContext = ActionContext
