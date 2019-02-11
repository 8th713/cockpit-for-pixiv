import React from 'react'
import { useFit } from '../hooks'
import { FitStatus } from '../constants'

type Props = {
  children?: React.ReactNode
}

const ValueContext = React.createContext(FitStatus.COVER)
const ActionContext = React.createContext(() => {})

export function FitProvider(props: Props) {
  const [status, cycle] = useFit()

  return (
    <ActionContext.Provider value={cycle}>
      <ValueContext.Provider value={status}>
        {props.children}
      </ValueContext.Provider>
    </ActionContext.Provider>
  )
}
FitProvider.ValueContext = ValueContext
FitProvider.ActionContext = ActionContext
