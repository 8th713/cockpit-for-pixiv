import React from 'react'
import { usePages } from '../hooks'
import { PickerProvider } from '.'

type Pages = ReturnType<typeof usePages>

const Value = React.createContext<Pages['result']>(null as any)
const Action = React.createContext<Pages['retry']>(null as any)

function useValue() {
  return React.useContext(Value)
}

function useAction() {
  return React.useContext(Action)
}

type Props = {
  children?: React.ReactNode
}

function PagesProvider(props: Props) {
  const id = PickerProvider.useValue()
  const { result, retry } = usePages(id!)

  return (
    <Action.Provider value={retry}>
      <Value.Provider value={result}>{props.children}</Value.Provider>
    </Action.Provider>
  )
}

const Context = Object.assign(PagesProvider, { useValue, useAction })

export { Context as PagesProvider }
