import React from 'react'
import { FitStatus } from '../constants'
import { useFit } from '../hooks'

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
FitProvider.useFitValue = function useFitValue() {
  return React.useContext(ValueContext)
}
FitProvider.useFitAction = function useFitAction() {
  return React.useContext(ActionContext)
}
