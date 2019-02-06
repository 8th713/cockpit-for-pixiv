import React from 'react'
import { useSpread } from '../hooks'
import { SpreadStatus } from '../constants'

type Spread = ReturnType<typeof useSpread>

const Value = React.createContext<Spread['status']>(SpreadStatus.SPREAD)
const Action = React.createContext<Spread['cycle']>(() => {})

function useValue() {
  return React.useContext(Value)
}

function useAction() {
  return React.useContext(Action)
}

type Props = {
  children?: React.ReactNode
}

function SpreadProvider(props: Props) {
  const { status, cycle } = useSpread()

  return (
    <Action.Provider value={cycle}>
      <Value.Provider value={status}>{props.children}</Value.Provider>
    </Action.Provider>
  )
}

const Context = Object.assign(SpreadProvider, { useValue, useAction })

export { Context as SpreadProvider }
