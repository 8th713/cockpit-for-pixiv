import React from 'react'
import { usePadding } from '../hooks'

type Props = {
  children?: React.ReactNode
}

const ValueContext = React.createContext(32)
const ActionContext = React.createContext((value: number) => {})

export function PaddingProvider(props: Props) {
  const [padding, setPadding] = usePadding()

  return (
    <ActionContext.Provider value={setPadding}>
      <ValueContext.Provider value={padding}>
        {props.children}
      </ValueContext.Provider>
    </ActionContext.Provider>
  )
}
PaddingProvider.usePaddingValue = function usePaddingValue() {
  return React.useContext(ValueContext)
}
PaddingProvider.usePaddingAction = function usePaddingAction() {
  return React.useContext(ActionContext)
}
