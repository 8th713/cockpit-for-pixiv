import React from 'react'
import { usePadding } from '../hooks'

type Padding = ReturnType<typeof usePadding>

const Value = React.createContext<Padding['value']>(32)
const Action = React.createContext<Padding['set']>(() => {})

function useValue() {
  return React.useContext(Value)
}

function useAction() {
  return React.useContext(Action)
}

type Props = {
  children?: React.ReactNode
}

const PaddingProvider = React.memo(function PaddingProvider(props: Props) {
  const { value, set } = usePadding()

  return (
    <Action.Provider value={set}>
      <Value.Provider value={value}>{props.children}</Value.Provider>
    </Action.Provider>
  )
})

const Context = Object.assign(PaddingProvider, { useValue, useAction })

export { Context as PaddingProvider }
