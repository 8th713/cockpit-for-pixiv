import React from 'react'
import { useExpansion } from '../hooks'

type Props = {
  children?: React.ReactNode
}

const ValueContext = React.createContext(false)
const ActionContext = React.createContext((force?: boolean) => {})

export function InfoProvider(props: Props) {
  const [opened, toggle] = useExpansion()

  return (
    <ActionContext.Provider value={toggle}>
      <ValueContext.Provider value={opened}>
        {props.children}
      </ValueContext.Provider>
    </ActionContext.Provider>
  )
}
InfoProvider.useInfoValue = function useInfoValue() {
  return React.useContext(ValueContext)
}
InfoProvider.useInfoAction = function useInfoAction() {
  return React.useContext(ActionContext)
}
