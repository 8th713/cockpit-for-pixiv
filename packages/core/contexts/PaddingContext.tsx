import React from 'react'
import { usePadding } from '../hooks'

type Props = {
  children?: React.ReactNode
}

const ValueContext = React.createContext(32)
const ActionContext = React.createContext((value: number) => {})

export function PaddingProvider(props: Props) {
  const { value, set } = usePadding()

  return (
    <ActionContext.Provider value={set}>
      <ValueContext.Provider value={value}>
        {props.children}
      </ValueContext.Provider>
    </ActionContext.Provider>
  )
}
PaddingProvider.ValueContext = ValueContext
PaddingProvider.ActionContext = ActionContext
