import React from 'react'
import { useExpansion } from '../hooks'

type Expansion = ReturnType<typeof useExpansion>

const Value = React.createContext<Expansion['value']>(true)
const Action = React.createContext<Expansion['toggle']>(() => {})

function useValue() {
  return React.useContext(Value)
}

function useAction() {
  return React.useContext(Action)
}

type Props = {
  children?: React.ReactNode
}

function ExpansionProvider(props: Props) {
  const { value, toggle } = useExpansion()

  return (
    <Action.Provider value={toggle}>
      <Value.Provider value={value}>{props.children}</Value.Provider>
    </Action.Provider>
  )
}

const Context = Object.assign(ExpansionProvider, { useValue, useAction })

export { Context as ExpansionProvider }
