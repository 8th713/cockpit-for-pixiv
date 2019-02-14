import React from 'react'
import { useSpread } from '../hooks'
import { SpreadStatus } from '../constants'

type Props = {
  children?: React.ReactNode
}

const ValueContext = React.createContext(SpreadStatus.SPREAD)
const ActionContext = React.createContext(() => {})

export function SpreadProvider(props: Props) {
  const [status, cycle] = useSpread()

  return (
    <ActionContext.Provider value={cycle}>
      <ValueContext.Provider value={status}>
        {props.children}
      </ValueContext.Provider>
    </ActionContext.Provider>
  )
}
SpreadProvider.useSpreadValue = function useSpreadValue() {
  return React.useContext(ValueContext)
}
SpreadProvider.useSpreadAction = function useSpreadAction() {
  return React.useContext(ActionContext)
}
